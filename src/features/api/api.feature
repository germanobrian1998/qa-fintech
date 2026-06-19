@api
Feature: API Contract Testing

  As a QA Engineer
  I want to validate the API contracts
  So that I can detect breaking changes early

  @smoke
  Scenario: GET /products returns valid response structure
    When I send a GET request to "/products"
    Then the response status should be 200
    And the response should contain a list of products
    And each product should have required fields

  @smoke
  Scenario: POST /users/login with valid credentials returns token
    When I login via API with email "customer@practicesoftwaretesting.com" and password "welcome01"
    Then the response status should be 200
    And the response should contain an access token

  @regression
  Scenario: POST /users/login with invalid credentials returns 401
    When I login via API with email "invalid@test.com" and password "wrongpassword"
    Then the response status should be 401

  @regression
  Scenario: GET /products response time is acceptable
    When I send a GET request to "/products"
    Then the response status should be 200
    And the response time should be under 2000 milliseconds