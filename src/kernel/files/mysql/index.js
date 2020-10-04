import Error from './error';

export default class MySQL {
  constructor(settings) {
    const { eventType } = settings;
    if (eventType === 'error') {
      return new Error(settings);
    }
  }
}
