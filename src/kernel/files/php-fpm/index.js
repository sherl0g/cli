import BaseParser from '@kernel/files/base-parser';

export default class PhpFpm extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'DD-MMM-YYYY HH:mm:ss',
      regex: /\[(?<datetime>[^\]]+)].* (?<log_level>[A-Z]+:) (?<message>.*)/gm,
    });
  }
}
