import { test as base} from "@playwright/test";
import { Page, BrowserContext } from '@playwright/test';
import { SwagPages } from "../../pom/web/pages/swagPages";
import globalSetup from "./beforeAndAfterSetup/globalSetup";
import globalTeardown from "./beforeAndAfterSetup/globalTeardown";
import globalSetupEach from "./beforeAndAfterSetup/globalSetupEach";
import globalTeardownEach from "./beforeAndAfterSetup/globalTeardownEach";
import { TestUtilities } from "../../utils/testUtilities";

// Playwright objects
let context: BrowserContext;
let page: Page;

// Page objects (POM) into a consolidate object
let AllPages: SwagPages;

// Boolean to control whether the context is created BEFORE EACH test (recommended to avoid log out)
// ... or just once before all tests (faster but the context is not recreated and the previous user is already logged in)
const CREATE_CONTEXT_BEFORE_EACH_TEST = true;

// Use DEPENCENCY INJECTION to make the consolidated Pages object for Swag Portal (POM) available in all tests that import this swagParentTest.ts file, without the need to import it in each test file or initialize it in a beforeEach block in each test file, we just need to initialize it once here in the beforeAll block and then it will be available in all tests that import this swagParentTest.ts file through the custom test object we are exporting at the end of this file. This way we can have a single initialization of the PagesCP object that can be used across all tests that need it, and we don't have to worry about initializing it multiple times or importing it in each test file. We just need to make sure that any test that imports this swagParentTest.ts file has access to the AllPagesCP object through the custom test object we are exporting at the end of this file.
export const test = base.extend<{ AllPages: SwagPages }>({
  AllPages: async ({ }, use) => {
    await use(AllPages);
  },
});

test.beforeAll(async ({ browser }) => {
  console.log('beforeAll block (inside swagParentTest.ts)');
  
  if(!CREATE_CONTEXT_BEFORE_EACH_TEST) { // if false
    context = await TestUtilities.returnBrowserContextWithVideo(browser);
    page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    AllPages = new SwagPages(page); // Initialize the consolidated Pages object for Swag Portal (POM)
  }

  await globalSetup(); // Call the global teardown function before all tests have completed
});

test.beforeEach(async ({ browser }) => {
  console.log('beforeEach block (inside swagParentTest.ts)');

  if(CREATE_CONTEXT_BEFORE_EACH_TEST) { // if true
    context = await TestUtilities.returnBrowserContextWithVideo(browser);
    page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    AllPages = new SwagPages(page); // Initialize the consolidated Pages object for Swag Portal (POM)
  }

  await globalSetupEach(); // Call the global setup function before each test
});

test.afterEach(async () => {
  console.log('afterEach block (inside swagParentTest.ts)');

    await globalTeardownEach(); // Call the global teardown function after each test
});

test.afterAll(async () => {
  console.log('afterAll block (inside swagParentTest.ts)');
  // cleanup logic
  await globalTeardown(); // Call the global teardown function after all tests have completed
});

//export { expect } from '@playwright/test'; // Not really necessary because we have our custom Asserts.ts class