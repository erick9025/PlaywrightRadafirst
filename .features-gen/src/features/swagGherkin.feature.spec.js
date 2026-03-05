// Generated from: src\features\swagGherkin.feature
import { test } from "playwright-bdd";

test.describe('SWAG pages', () => {

  test('Successful login with valid credentials to Swag Sauce', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the Swag login page', null, { page }); 
    await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
    await Then('I should be redirected to the Swag dashboard', null, { page }); 
    await When('I add "Sauce Labs Onesie" product to the cart', null, { page }); 
    await And('I add "Sauce Labs Bike Light" product to the cart', null, { page }); 
  });

  test.describe('DDT Single Successful login with valid credentials to Swag Sauce', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Backpack" product to the cart', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Bike Light" product to the cart', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Bolt T-Shirt" product to the cart', null, { page }); 
    });

    test('Example #4', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Fleece Jacket" product to the cart', null, { page }); 
    });

    test('Example #5', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Onesie" product to the cart', null, { page }); 
    });

    test('Example #6', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Test.allTheThings() T-Shirt" product to the cart', null, { page }); 
    });

  });

  test.describe('DDT Double Successful login with valid credentials to Swag Sauce', () => {

    test('Example #1', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Backpack" product to the cart', null, { page }); 
      await Then('I print "one"', null, { page }); 
    });

    test('Example #2', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Bike Light" product to the cart', null, { page }); 
      await Then('I print "two"', null, { page }); 
    });

    test('Example #3', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Bolt T-Shirt" product to the cart', null, { page }); 
      await Then('I print "three"', null, { page }); 
    });

    test('Example #4', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Fleece Jacket" product to the cart', null, { page }); 
      await Then('I print "four"', null, { page }); 
    });

    test('Example #5', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Sauce Labs Onesie" product to the cart', null, { page }); 
      await Then('I print "five"', null, { page }); 
    });

    test('Example #6', async ({ Given, When, Then, page }) => { 
      await Given('I am on the Swag login page', null, { page }); 
      await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
      await Then('I should be redirected to the Swag dashboard', null, { page }); 
      await When('I add "Test.allTheThings() T-Shirt" product to the cart', null, { page }); 
      await Then('I print "six"', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks }) => $runBeforeAllHooks(test, {  }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks }) => $registerAfterAllHooks(test, {  }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('after', { page }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\swagGherkin.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":16,"pickleLine":20,"tags":[],"steps":[{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Backpack\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Backpack\"","children":[{"start":7,"value":"Sauce Labs Backpack","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":31,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bolt T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bolt T-Shirt\"","children":[{"start":7,"value":"Sauce Labs Bolt T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":37,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":38,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Fleece Jacket\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Fleece Jacket\"","children":[{"start":7,"value":"Sauce Labs Fleece Jacket","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":44,"pickleLine":24,"tags":[],"steps":[{"pwStepLine":45,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":51,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":52,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I add \"Test.allTheThings() T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Test.allTheThings() T-Shirt\"","children":[{"start":7,"value":"Test.allTheThings() T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":62,"pickleLine":36,"tags":[],"steps":[{"pwStepLine":63,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Backpack\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Backpack\"","children":[{"start":7,"value":"Sauce Labs Backpack","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":67,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"one\"","stepMatchArguments":[{"group":{"start":8,"value":"\"one\"","children":[{"start":9,"value":"one","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":70,"pickleLine":37,"tags":[],"steps":[{"pwStepLine":71,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":73,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"two\"","stepMatchArguments":[{"group":{"start":8,"value":"\"two\"","children":[{"start":9,"value":"two","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":78,"pickleLine":38,"tags":[],"steps":[{"pwStepLine":79,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bolt T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bolt T-Shirt\"","children":[{"start":7,"value":"Sauce Labs Bolt T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":83,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"three\"","stepMatchArguments":[{"group":{"start":8,"value":"\"three\"","children":[{"start":9,"value":"three","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":86,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":87,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Fleece Jacket\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Fleece Jacket\"","children":[{"start":7,"value":"Sauce Labs Fleece Jacket","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"four\"","stepMatchArguments":[{"group":{"start":8,"value":"\"four\"","children":[{"start":9,"value":"four","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":94,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":95,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":99,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"five\"","stepMatchArguments":[{"group":{"start":8,"value":"\"five\"","children":[{"start":9,"value":"five","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":102,"pickleLine":41,"tags":[],"steps":[{"pwStepLine":103,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":105,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I add \"Test.allTheThings() T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Test.allTheThings() T-Shirt\"","children":[{"start":7,"value":"Test.allTheThings() T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":107,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I print \"six\"","stepMatchArguments":[{"group":{"start":8,"value":"\"six\"","children":[{"start":9,"value":"six","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end