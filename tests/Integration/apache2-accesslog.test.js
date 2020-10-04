// eslint-disable-next-line import/no-unresolved
import AccessLog from '@files/apache2/access-log';
// eslint-disable-next-line import/no-unresolved
import BaseParser from '@files/base-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from '@jest/globals';

test('AccessLog extends BaseParser', () => {
  const settings = {
    hostname: 'localhost',
    metric: 'apache2',
    eventType: 'http',
    timezone: 'UTC',
  };
  const apache2 = new AccessLog(settings);
  expect(apache2 instanceof BaseParser).toBeTruthy();
});
