import AccessLog from './access-log';
import ErrorLog from './error-log';

export default class Apache2 {
  constructor(settings) {
    const { eventType } = settings;
    return (eventType === 'http')
      ? new AccessLog(settings)
      : new ErrorLog(settings);
  }
}
