import { test } from '@playwright/test';
import { ProductsService } from '../../pom/api/services/productsService';
import { TestUtilities } from '../../utils/testUtilities';

test.describe.serial('Tests for Apis with POM', () => {

  let productsService: ProductsService;

  ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
  test.beforeAll(async ({ playwright }, testInfo) => {
    productsService = new ProductsService();
  });

  test.beforeEach(async () => {
    console.log("beforeEach - List of products:");
    for (const product of ProductsService.listAllProducts) {        
      console.log(`Product: ${product}`);
    }
  });

  test.afterEach(async () => {
    console.log("afterEach - List of products:");
    for (const product of ProductsService.listAllProducts) {        
      console.log(`Product: ${product}`);
    }
  });

  test.afterAll(async () => {
    await productsService.closeConnection();
  });

  /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

  test("Get all products", async () => {    
    await productsService.getAllProducts();
  });

  for (const product of ProductsService.listAllProducts) {
    test("ERICK Search all products:" + product, async ({page}) => {
      await page.goto("https://www.amazon.com.mx/");
      await page.locator(`input#twotabsearchtextbox`).fill(product);
      await page.locator(`#nav-search-submit-button`).click();
    });    
  }
});