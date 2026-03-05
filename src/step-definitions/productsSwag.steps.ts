import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SwagProductsPage } from '../pom/pages/pagesByFeature/swagProductsPage';

const { Given, When, Then } = createBdd();

When(
  "I add {string} product to the cart",
  async ({ page }, productName: string) => {
    const productsPage = new SwagProductsPage(page);
    await productsPage.addProductToCart(productName);
  }
);

Then(
  "I print {string}",
  async ({ page }, something: string) => {
    const productsPage = new SwagProductsPage(page);
    await productsPage.printSomething(something);
  }
);
