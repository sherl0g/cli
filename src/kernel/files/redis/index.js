import BaseParser from '@kernel/files/base-parser';

export default class Redis extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'DD MMM YYYY HH:mm:ss.SSS',
      regex: /^(?<pid>\d+:[A-Z]) (?<datetime>\d{2} (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) \d{4} \d{2}:\d{2}:\d{2}\.\d{3}) (?<message>.*)/gm,
    });
  }
}
