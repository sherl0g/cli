import BaseParser from '@kernel/files/base-parser';

export default class Error extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]',
      regex: /^(?<datetime>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z) (?<message>.*)/gm,
    });
  }
}
