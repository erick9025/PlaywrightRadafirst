Feature: User Login

  Scenario: Jueves Successful login with valid credentials to Swag Sauce
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
    When I add "Sauce Labs Onesie" product to the cart
    And I add "Sauce Labs Bike Light" product to the cart

  Scenario: Jueves Successful login with valid credentials to Swag Sauce TWO
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
    When I add "Sauce Labs Onesie" product to the cart
    When I add "Sauce Labs Bike Light" product to the cart

  #Scenario: Jueves Successful login with valid credentials to Swag Sauce without POM
    #Given We are on the Swag login page
    #When We login to Swag with username "standard_user" and password "secret_sauce"
    #Then We should be redirected to the Swag dashboard