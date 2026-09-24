import { ProjectTestConfigRadafirst } from './configs/models/projectTestConfigRadafirst';
import * as fs from 'fs';
import * as path from 'path';

export const env = process.env.TEST_ENV || 'QA';

// Build path to the correct config file
export const configPath = path.resolve(__dirname, `./configs/jsons-by-env/${env}.json`);

// Parse JSON config
export const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export const config: ProjectTestConfigRadafirst = {
  workers: 4,
  retries: process.env.CI ? 2 : 0, // Retry failed tests up to 2 times
  timeout: 10_000, // 60 seconds = 1 minute
  fullyParallel: true,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in await expect(locator).toHaveText();
     */
    timeout: 5_000
  },
  reporter: [
    ['html', { open: 'always' }],
    ['list'],
    ['json']
  ],
  use: {
    // OUR CUSTOM Variables from root
    baseURL: configFile.baseURL,
    erickVar: configFile.erickVar,
    erickVarString: configFile.erickVarString,  
    erickVarInt: configFile.erickVarInt,
    erickVarFloat: configFile.erickVarFloat,
    erickVarBoolean : configFile.erickVarBoolean,
    // OUR CUSTOM Variables from object nodes
    credentials: configFile.credentials,
    browsers: configFile.browsers,
    // From here are the default/original values
    trace: 'on',
    screenshot: 'on',
    video: 'off',
    // 👇 Add this section
    launchOptions: {
      slowMo: 1
    }
  }
};

export default config;