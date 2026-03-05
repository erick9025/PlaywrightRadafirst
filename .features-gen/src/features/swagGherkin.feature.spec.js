// Generated from: src\features\swagGherkin.feature
import { test } from "playwright-bdd";

test.describe('User Login', () => {

  test.describe('Jueves Successful login with valid credentials to Swag Sauce', () => {

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

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\swagGherkin.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Backpack\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Backpack\"","children":[{"start":7,"value":"Sauce Labs Backpack","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bolt T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bolt T-Shirt\"","children":[{"start":7,"value":"Sauce Labs Bolt T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":29,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":30,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Fleece Jacket\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Fleece Jacket\"","children":[{"start":7,"value":"Sauce Labs Fleece Jacket","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":37,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":43,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":44,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Test.allTheThings() T-Shirt\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Test.allTheThings() T-Shirt\"","children":[{"start":7,"value":"Test.allTheThings() T-Shirt","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end