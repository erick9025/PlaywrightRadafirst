Feature: SWAG pages

  Scenario: Successful login with valid credentials to Swag Sauce
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
    When I add "Sauce Labs Onesie" product to the cart
    And I add "Sauce Labs Bike Light" product to the cart

  ## DDT = Data Driven Testing

  Scenario Outline: DDT Single Successful login with valid credentials to Swag Sauce
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
    When I add "<product>" product to the cart

    Examples:
      | product                       |
      | Sauce Labs Backpack           |
      | Sauce Labs Bike Light         |
      | Sauce Labs Bolt T-Shirt       |
      | Sauce Labs Fleece Jacket      |
      | Sauce Labs Onesie             |
      | Test.allTheThings() T-Shirt   |

  Scenario Outline: DDT Double Successful login with valid credentials to Swag Sauce
    Given I am on the Swag login page
    When I login to Swag with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Swag dashboard
    When I add "<product>" product to the cart
    Then I print "<something>"

    Examples:
      | product                       | something   |
      | Sauce Labs Backpack           | one         |
      | Sauce Labs Bike Light         | two         |
      | Sauce Labs Bolt T-Shirt       | three       |
      | Sauce Labs Fleece Jacket      | four        |
      | Sauce Labs Onesie             | five        |
      | Test.allTheThings() T-Shirt   | six         |