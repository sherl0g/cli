import BaseParser from '@kernel/files/base-parser';

export default class ErrorLog extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'YYYY/MM/DD HH:mm:ss',
      regex: /^(?<datetime>\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}) \[(?<log_level>\w+)] (?<pid>\d+).(?<tid>\d+): (?<message>.*)/gm,
    });
  }
}
