@cart
Feature: Shopping Cart Management

  As a customer
  I want to manage my shopping cart
  So that I can purchase the products I need

  Background:
    Given I am on the home page

  @smoke
  Scenario: Add a product to the cart
    When I add the first product to the cart
    Then the cart counter should show 1

  @smoke
  Scenario: Remove a product from the cart
    Given I have 1 product in the cart
    When I remove the product from the cart
    Then the cart should be empty

  @regression
  Scenario: Cart persists after navigation
    Given I have 1 product in the cart
    When I navigate to the home page
    Then the cart counter should show 1

  @regression
  Scenario: Cart total updates when adding multiple products
    When I add the first product to the cart
    And I add the second product to the cart
    Then the cart counter should show 2