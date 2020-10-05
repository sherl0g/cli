#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {
  assign, compact, debounce, get,
  isEmpty, map, size,
} from 'lodash';
import portfinder from 'portfinder';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import configStub from '@stubs/config.json';
import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import os from 'os';
import commander from 'commander';

import Ajv from 'ajv';
import moment from 'moment-timezone';
import open from 'open';
import chalk from 'chalk';
import pako from 'pako';

import { Readable } from 'stream';
import internalIp from 'internal-ip';
import clear from 'console-clear';
import Watch from '@kernel/watch';
import Package from '@root/package.json';

const readableStream = new Readable({
  highWaterMark: 100000,
  objectMode: true,
  encoding: 'utf8',
});

// eslint-disable-next-line no-underscore-dangle
readableStream._read = () => {};

const init = (options) => {
  process.on('warning', (e) => {
    console.warn(e.stack);
    process.exit(1);
  });

  const app = express();
  const server = http.createServer(app);

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  const dir = path.normalize(`${process.execPath}/../../lib/node_modules/${Package.name}/public`);
  if (!fs.existsSync(dir)) {
    console.log('Unable to locate your global node_modules path');
    process.exit(1);
  }
  app.use(express.static(dir));

  app.get('/ready', (req, res) => {
    res.send('UP');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
  });

  portfinder.getPortPromise()
    .then((port) => {
      const PORT = options.port || port;
      server.listen(PORT, async () => {
        const wss = new WebSocket.Server({ server });
        const backpressure = options.backpressure ? Number(options.backpressure) : 1000;
        const deflate = options.compression !== undefined ? Boolean(options.compression) : true;
        const toBuffer = (buffer, compress) => {
          if (!compress) return JSON.stringify(buffer);
          return pako.deflate(JSON.stringify(buffer), { to: 'string' });
        };

        clear(true);
        const URL = `http://localhost:${PORT}`;
        console.log('Sherlog listening on:');
        console.log('\n');
        console.log(`   - Dashboard:   ${chalk.green(URL)}`);
        console.log(`   - Local:       ${chalk.green(`ws://localhost:${PORT}`)}`);
        console.log(`   - Network:     ${chalk.green(`ws://${await internalIp.v4()}:${PORT}`)}`);
        const watch = new Watch(options);
        watch.on('buffer', (buffer) => {
          readableStream.push(toBuffer(buffer, deflate));
        });

        const handler = debounce(() => {
          if (size(wss.clients)) {
            const data = readableStream.read();
            if (data) {
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(data);
                }
              });
            }
            readableStream.pause();
            handler();
          }
        }, backpressure, { maxWait: 2000 });

        readableStream.on('readable', handler);

        watch.on('error', (error) => {
          console.error('ERROR: ', error);
        });

        wss.on('connection', async () => {
          readableStream.emit('readable');
        });

        setTimeout(async () => {
          if (options.browser) await open(URL);
        }, 500);
      });
    });
};

const SHERLOG_CONFIG_FILE_NAME = '.sherlog';
const INITIALIZED = fs.existsSync(`${process.cwd()}/${SHERLOG_CONFIG_FILE_NAME}`);
const CONFIG = JSON.stringify(assign(configStub, { hostname: os.hostname() }), null, 2);
const checkSchema = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const schema = {
    type: 'object',
    properties: {
      hostname: { type: 'string', minimum: 1 },
      backpressure: { type: 'number', minimum: 0 },
      chunks: { type: 'number', minimum: 1 },
      env: { type: 'string', minLength: 1 },
      compression: { type: 'boolean', enum: [true, false] },
      files: {
        type: 'array',
        uniqueItems: true,
        minItems: 1,
        maxItems: 50,
        items: {
          type: 'object',
          properties: {
            metric: {
              type: 'string',
              enum: [
                'apache2',
                'nginx',
                'phpfpm',
                'monolog',
                'mysql',
                'redis',
              ],
            },
            eventType: {
              type: 'string',
              enum: ['http', 'error'],
            },
            fromBeginning: {
              type: 'boolean',
              enum: [true, false],
            },
            file: {
              type: 'string',
              minLength: 1,
            },
            timezone: {
              type: 'string',
              enum: moment.tz.names(),
            },
          },
          required: ['metric', 'file', 'timezone'],
          if: {
            properties: {
              metric: { enum: ['apache2', 'nginx', 'mysql'] },
            },
          },
          then: {
            required: ['eventType'],
          },
        },
      },
    },
    required: ['hostname', 'files'],
  };
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return (!valid) ? validate.errors : [];
};

const parseSchemaErrors = (errors) => compact(map(errors, (error) => {
  if (error.keyword === 'if') return undefined;
  return `${chalk.red('->')} ${error.dataPath} ${error.message} ${get(error, 'params.allowedValues', '')}`;
}));

const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const testConfig = (cmd) => {
  if (cmd.config && !fs.existsSync(cmd.config)) {
    console.log(`invalid config file path ${chalk.yellow(cmd.config)}`);
    process.exit(1);
  }

  if (!INITIALIZED && !cmd.config) {
    console.log(`${chalk.yellow(SHERLOG_CONFIG_FILE_NAME)} not found. run the init command to initialize the current working directory`);
    process.exit(1);
  }

  const file = fs.readFileSync(cmd.config || SHERLOG_CONFIG_FILE_NAME, 'utf8');

  if (!isJSON(file)) {
    console.log('your config file has an invalid JSON syntax');
    process.exit(1);
  }

  const errors = checkSchema(JSON.parse(file));
  if (!isEmpty(errors)) {
    console.log(parseSchemaErrors(errors).join(os.EOL));
    process.exit(1);
  }
};

commander
  .command('init')
  .option('-f, --force', `force to overwrite ${SHERLOG_CONFIG_FILE_NAME}`)
  .description('initializes the project')
  .action((cmd) => {
    if (!INITIALIZED || (INITIALIZED && cmd.force)) {
      console.log(`creating ${chalk.green(SHERLOG_CONFIG_FILE_NAME)}`);
      fs.writeFileSync(SHERLOG_CONFIG_FILE_NAME, CONFIG);
      process.exit(0);
    } else {
      console.log(`pass the --force option to overwrite your existing ${chalk.green(SHERLOG_CONFIG_FILE_NAME)} config file`);
      process.exit(1);
    }
  });

commander
  .command('test')
  .description('validate your config schema')
  .option('-c, --config <path>', 'path to config file')
  .action((cmd) => {
    testConfig(cmd);
    console.log(`your ${chalk.green(cmd.config || SHERLOG_CONFIG_FILE_NAME)} schema is valid!`);
    process.exit(0);
  });

commander
  .command('start')
  .description('start the server')
  .option('-c, --config <path>', 'path to config file')
  .option('-p, --port <port-number>', 'port number')
  .option('--browser', 'open browser window')
  .action((cmd) => {
    testConfig(cmd);
    const config = JSON.parse(fs.readFileSync(cmd.config || SHERLOG_CONFIG_FILE_NAME, 'utf8'));
    const promises = map(config.files, (item) => new Promise((resolve, reject) => {
      fs.access(item.file, fs.constants.F_OK, (err) => {
        if (err) reject(err.path);
        resolve(item.file);
      });
    }));
    Promise.all(promises)
      .then(() => {
        init({
          browser: Boolean(cmd.browser),
          port: cmd.port,
          ...config,
        });
      })
      .catch((error) => {
        console.log(`no such file ${chalk.yellow(error)}`);
        process.exit(1);
      });
  });

commander
  .version(Package.version, '-v, --version', 'print version');

commander.parse(process.argv);
