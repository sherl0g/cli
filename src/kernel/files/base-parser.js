import assignIn from 'lodash/assignIn';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import take from 'lodash/take';
import moment from 'moment-timezone';
import os from 'os';
import matchAll from 'string.prototype.matchall';

export default class BaseParser {
  constructor(settings) {
    const {
      dateFormat, hostname, payload, metric, regex, eventType, timezone,
    } = settings;

    this.dateFormat = dateFormat;
    this.hostname = hostname;
    this.payload = payload;
    this.metric = metric;
    this.regex = regex;
    this.eventType = eventType;
    this.timezone = timezone;
    this.buffer = [];
  }

  tag(values, timestamp) {
    return {
      metric: this.metric,
      tags: {
        hostname: this.hostname,
        type: this.eventType,
        platform: os.platform(),
      },
      timestamp: Number(timestamp),
      values,
    };
  }

  format(items) {
    const group = [];
    items.forEach((item) => {
      const dateObject = moment.tz(item.datetime, this.dateFormat, this.timezone);
      const utc = dateObject.clone().tz('UTC');
      group.push(assignIn(item, {
        datetime: utc.format(),
        timestamp: Number(utc.format('X')),
      }));
    });

    return map(groupBy(group, 'timestamp'), (metrics, timestamp) => this.tag(metrics, timestamp));
  }

  dispatch(bufferSize, callback) {
    const metrics = take(this.buffer, bufferSize).join('\n');
    const matches = [...matchAll(metrics, this.regex)];
    if (matches.length) {
      callback(this.format(map(matches, 'groups')));
    }
    this.buffer.splice(0, bufferSize);
  }

  onBuffer(buffer, callback) {
    if (this.buffer.length === this.payload || buffer === '<<EOF>>') {
      const bufferSize = this.buffer.length;
      this.dispatch(bufferSize, callback);
    }
    this.buffer.push(buffer);
  }
}
