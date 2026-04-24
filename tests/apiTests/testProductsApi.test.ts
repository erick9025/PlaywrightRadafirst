import { test } from '@playwright/test';
import { ProductsService } from '../../pom/api/services/productsService';

test.describe.serial('Tests for Apis with POM', () => {

  let productsService: ProductsService;

  ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
  test.beforeAll(async () => {
    console.log("beforeAll");
    productsService = new ProductsService();
    await productsService.getAllProducts();

    for (const product of ProductsService.listAllProducts) {        
      console.log(`Product: ${product}`);
    }
  });

  test.beforeEach(async () => {
    console.log("beforeEach");
    
  });

  test.afterEach(async () => {
    console.log("afterEach");
    for (const product of ProductsService.listAllProducts) {        
      console.log(`Product: ${product}`);
    }
  });

  test.afterAll(async () => {
    console.log("afterAll");
    await productsService.closeConnection();
  });

  /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

  test("erick Get all products", async () => {    
    console.log("Get all products test");
  });

  for (const product of ProductsService.listAllProducts) {
    test("ERICK Search all products:" + product, async ({page}) => {
      await page.goto("https://www.amazon.com.mx/");
      await page.locator(`input#twotabsearchtextbox`).fill(product);
      await page.locator(`#nav-search-submit-button`).click();
    });
  }
});