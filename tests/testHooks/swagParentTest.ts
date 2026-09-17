import { test as base} from "@playwright/test";
import { SwagPages } from "../../pom/web/pages/swagPages";

// Use DEPENCENCY INJECTION to make the consolidated Pages object for Swag Portal (POM) available in all tests that import this swagParentTest.ts file, without the need to import it in each test file or initialize it in a beforeEach block in each test file, we just need to initialize it once here in the beforeAll block and then it will be available in all tests that import this swagParentTest.ts file through the custom test object we are exporting at the end of this file. This way we can have a single initialization of the PagesCP object that can be used across all tests that need it, and we don't have to worry about initializing it multiple times or importing it in each test file. We just need to make sure that any test that imports this swagParentTest.ts file has access to the AllPagesCP object through the custom test object we are exporting at the end of this file.
export const test = base.extend<{ AllPages: SwagPages }>({
  AllPages: async ({ page }, use) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await use(new SwagPages(page));
  },
});

//export { expect } from '@playwright/test'; // Not really necessary because we have our custom Asserts.ts class