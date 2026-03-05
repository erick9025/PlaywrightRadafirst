// Generated from: src\features\swagGherkin.feature
import { test } from "playwright-bdd";

test.describe('User Login', () => {

  test('Jueves Successful login with valid credentials to Swag Sauce', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the Swag login page', null, { page }); 
    await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
    await Then('I should be redirected to the Swag dashboard', null, { page }); 
    await When('I add "Sauce Labs Onesie" product to the cart', null, { page }); 
    await And('I add "Sauce Labs Bike Light" product to the cart', null, { page }); 
  });

  test('Jueves Successful login with valid credentials to Swag Sauce TWO', async ({ Given, When, Then, page }) => { 
    await Given('I am on the Swag login page', null, { page }); 
    await When('I login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
    await Then('I should be redirected to the Swag dashboard', null, { page }); 
    await When('I add "Sauce Labs Onesie" product to the cart', null, { page }); 
    await When('I add "Sauce Labs Bike Light" product to the cart', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\swagGherkin.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I am on the Swag login page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":30,"value":"\"standard_user\"","children":[{"start":31,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"secret_sauce\"","children":[{"start":60,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should be redirected to the Swag dashboard","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Onesie\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Onesie\"","children":[{"start":7,"value":"Sauce Labs Onesie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I add \"Sauce Labs Bike Light\" product to the cart","stepMatchArguments":[{"group":{"start":6,"value":"\"Sauce Labs Bike Light\"","children":[{"start":7,"value":"Sauce Labs Bike Light","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end