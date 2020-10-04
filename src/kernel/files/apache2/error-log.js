import BaseParser from '@kernel/files/base-parser';

export default class ErrorLog extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'ddd MMM DD HH:mm:ss.SSSSSS YYYY', // Mon Aug 24 15:47:38.783904 2020
      regex: /\[(?<datetime>((Mon|Tue(s)?|Wed(nes)?|Thu(rs|r)?|Fri|Sat(ur)?|Sun)(day)?) (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) \d{2} \d{2}:\d{2}:\d{2}\.\d{6} \d{4})] (?<message>.*)/gm,
    });
  }
}
