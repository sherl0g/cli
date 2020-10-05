import BaseParser from '@kernel/files/base-parser';

export default class AccessLog extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'DD/MMM/YYYY:HH:mm:ss ZZ',
      regex: /^(?<client>\S+) \S+ .*\[(?<datetime>\d{2}\/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\/\d{4}:\d{2}:\d{2}:\d{2} [+|-]\d{4})] (?<message>.*)/gm,
    });
  }
}
