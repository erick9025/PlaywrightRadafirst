import { test as base} from "@playwright/test";
import globalSetup from "./beforeAndAfterSetup/globalSetup";
import globalTeardown from "./beforeAndAfterSetup/globalTeardown";

export const test = base.extend({});

test.beforeAll(async () => {
    console.log("Global before all executed");
    // You can perform any global setup tasks here, such as initializing databases, setting environment variables, etc.
    await globalSetup();
});

test.afterAll(async () => {
    console.log("Global after all executed");
    // You can perform any global teardown tasks here, such as closing databases, cleaning up resources, etc.
    await globalTeardown();
});