import { test, expect, request } from '@playwright/test';

async function getSearchTerms(): Promise<string[]> {
  const apiContext = await request.newContext();
  const response = await apiContext.get('https://fakestoreapi.com/products');
  const body = await response.json();
  return body.map((product: { title: string }) => product.title);
}

// 👇 Resolve BEFORE defining tests


test.describe('Products DDT', async () => {

  let searchTerms: string[] = [];

  test.beforeAll(async () => {
    searchTerms = await getSearchTerms();
  });

  for (const product of searchTerms) {
    test("ERICK Search all products:" + product, async ({page}) => {
      await page.goto("https://www.amazon.com.mx/");
      await page.locator(`input#twotabsearchtextbox`).fill(product);
      await page.locator(`#nav-search-submit-button`).click();
    });
  }
});