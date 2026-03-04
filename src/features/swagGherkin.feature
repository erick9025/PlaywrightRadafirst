Feature: User Login

  Scenario: Successful login with valid credentials to Swag Sauce
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard

  Scenario: Successful login with valid credentials to Swag Sauce without POM
    Given We are on the Swag login page
    When We login to Swag with username "standard_user" and password "secret_sauce"
    Then We should be redirected to the Swag dashboard