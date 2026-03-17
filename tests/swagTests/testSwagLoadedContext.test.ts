import { test } from '../fixtures/persistentFixture';

test('test with persistent profile', async ({ persistentPage }) => {
  if (!persistentPage) test.skip();

  await persistentPage!.goto('https://facebook.com');
  await persistentPage!.waitForTimeout(15_000); // Wait for 5 seconds to observe the page
});