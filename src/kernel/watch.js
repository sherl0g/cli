import { Tail } from '@libs/tail';
import Parse from '@kernel/files/parser';

const EventEmitter = require('events');

export default class Watch extends EventEmitter {
  constructor(config) {
    super();
    const { hostname, files, chunks } = config;
    this.watcher = [];
    this.buffer = [];
    this.count = 0;
    const payload = Number(chunks) || 1;
    this.config = files.forEach((f) => {
      const {
        metric, file, eventType, timezone, dateFormat, regex, fromBeginning,
      } = f;
      if (!Object.keys(Parse).includes(metric)) return;
      const parser = new Parse[metric]({
        hostname, payload, metric, eventType, timezone, dateFormat, regex,
      });
      const stream = new Tail(file, { flushAtEOF: true, fromBeginning });
      stream.on('line', (data) => {
        parser.onBuffer(data, this.read.bind(this));
      });
      stream.on('error', (error) => {
        this.emit('error', error);
      });
      this.watcher.push(stream);
    });
  }

  read(data) {
    data.forEach((i) => {
      this.count += i.values.length;
    });

    console.log(this.count);
    this.emit('buffer', data);
  }

  unwatch() {
    return new Promise((resolve, reject) => {
      try {
        this.watcher.forEach((file, index) => {
          file.unwatch();
          this.watcher.splice(index, 1);
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
