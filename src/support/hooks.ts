import { createBdd } from "playwright-bdd";

declare const console: {
  log(...data: unknown[]): void;
};

const { Before, After, BeforeAll, AfterAll } = createBdd();

BeforeAll(async function () {
  console.log("BeforeAll ERICK MENTORSHIP");
});

Before(async function ({ page: _page }) {
  console.log("Before each ERICK MENTORSHIP");
});

After(async function ({ page: _page }) {
  console.log("After each ERICK MENTORSHIP");
});

AfterAll(async function () {
  console.log("AfterAll ERICK MENTORSHIP");
});
