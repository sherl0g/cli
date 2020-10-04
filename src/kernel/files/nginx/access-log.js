import BaseParser from '@kernel/files/base-parser';

export default class AccessLog extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'DD/MMM/YYYY:HH:mm:ss ZZ', // [23/Aug/2020:03:47:07 +0000]
      regex: /^(?<client>\S+) \S+ .*\[(?<datetime>\d{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/\d{4}:\d{2}:\d{2}:\d{2} [+|-]\d{4})] (?<message>.*)/gm,
      // eslint-disable-next-line max-len
      // regex: /^(?<client>\S+) \S+ (?<userid>\S+) .*\[(?<datetime>[^\]]+)].* "(?<method>[A-Z]+) (?<request>[^ "]+)? (?<protocol>HTTP\/[0-9.]+)" (?<status>[0-9]{3}) (?<size>[0-9]+|-) "(?<referrer>[^"]*)" "(?<useragent>[^"]*)"/gm,
    });
  }
}
