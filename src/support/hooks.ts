import { createBdd } from "playwright-bdd";

declare const console: {
  log(...data: unknown[]): void;
};

const { Before, After, BeforeAll, AfterAll } = createBdd();

BeforeAll(async function () {
  console.log("BeforeAll ERICK MENTORSHIP");
});

Before(async function ({ page }) {
  console.log("Before each ERICK MENTORSHIP");
  await page.context().tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });
});

After(async function ({ page, $testInfo }) {
  console.log("After each ERICK MENTORSHIP");
  const tracePath = $testInfo.outputPath("trace.zip");
  await page.context().tracing.stop({ path: tracePath });
  await $testInfo.attach("trace", {
    path: tracePath,
    contentType: "application/zip",
  });
});

AfterAll(async function () {
  console.log("AfterAll ERICK MENTORSHIP");
});
