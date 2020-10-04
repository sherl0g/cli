import BaseParser from '@kernel/files/base-parser';

export default class Monolog extends BaseParser {
  constructor(settings) {
    super({
      ...settings,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      regex: /^\[(?<datetime>.*)] (?<channel>.+?)\.(?<severity>[A-Z]+): (?<message>(?:[^\n][ \n]?)+)$/gm,
    });
  }
}
