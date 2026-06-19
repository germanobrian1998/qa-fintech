@auth
Feature: User Authentication

  As a registered user
  I want to be able to log in to the application
  So that I can access my account and make purchases

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I enter email "customer@practicesoftwaretesting.com"
    And I enter password "welcome01"
    And I click the login button
    Then I should see my account dashboard
    And I should see my full name "Jane Doe"

  @smoke
  Scenario: Failed login with incorrect password
    When I enter email "customer@practicesoftwaretesting.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see the error message "Invalid email or password"

  @regression
  Scenario: Failed login with unregistered email
    When I enter email "notregistered@test.com"
    And I enter password "somepassword"
    And I click the login button
    Then I should see the error message "Invalid email or password"

  @regression
  Scenario Outline: Login form validation with empty fields
    When I enter email "<email>"
    And I enter password "<password>"
    And I click the login button
    Then I should see a validation error for "<field>"

    Examples:
      | email                                    | password   | field    |
      | customer@practicesoftwaretesting.com     |            | password |
      |                                          | welcome01  | email    |