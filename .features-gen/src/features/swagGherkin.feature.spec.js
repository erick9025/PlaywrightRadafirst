// Generated from: src\features\swagGherkin.feature
import { test } from "playwright-bdd";

test.describe('User Login', () => {

  test('Successful login with valid credentials to Swag Sauce without POM', async ({ Given, When, Then, page }) => { 
    await Given('We are on the Swag login page', null, { page }); 
    await When('We login to Swag with username "standard_user" and password "secret_sauce"', null, { page }); 
    await Then('We should be redirected to the Swag dashboard', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\swagGherkin.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given We are on the Swag login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When We login to Swag with username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":31,"value":"\"standard_user\"","children":[{"start":32,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"secret_sauce\"","children":[{"start":61,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then We should be redirected to the Swag dashboard","stepMatchArguments":[]}]},
]; // bdd-data-end