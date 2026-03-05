import { createBdd } from "playwright-bdd";

const { Before, After, BeforeAll, AfterAll } = createBdd();

BeforeAll(async function () {
  console.log("BeforeAll ERICK");
});

Before(async function ({ page: _page }) {
  console.log("Before each ERICK");
});

After(async function ({ page: _page }) {
  console.log("After each ERICK");
});

AfterAll(async function () {
  console.log("AfterAll ERICK");
});