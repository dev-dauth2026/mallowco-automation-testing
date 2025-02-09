# Mallowco Automation Testing

This repository contains **Playwright**-based automated tests for Mallowco’s web application, utilizing a **Page Object Model (POM)** structure. The goal is to ensure key functionalities—such as OAuth/login, signup, cart operations, checkout, filtering, and search—are robust and consistently validated.

---

## Table of Contents

1. [Overview](#overview)  
2. [Repository Structure](#repository-structure)  
3. [Tests Included](#tests-included)  
4. [Using the Page Object Model](#using-the-page-object-model)  
5. [Setup & Installation](#setup--installation)  
6. [Running Tests](#running-tests)  
7. [Contributing](#contributing)  
8. [License](#license)

---

## Overview

- **Playwright**: Used for end-to-end testing in modern browsers.  
- **Page Object Model (POM)**: Enhances maintainability and readability by separating page-specific selectors and actions into dedicated classes or modules.  
- **Coverage**: Critical user flows, including OAuth login, signup, cart operations, checkout, filtering, and search functionality.  
- **Integration**: Can be expanded to CI/CD tools (e.g., GitHub Actions, Jenkins) for automated regression and continuous testing.

---

### Key Tips

- **pages**: Holds **POM** files, each representing a page or feature (e.g., `LoginPage.js`, `CartPage.js`).  
- **tests**: Contains the Playwright test specs covering various user flows.  
- **playwright.config.ts**: Configuration for browsers, test timeouts, and reporting.  
- **package.json**: Manages dependencies and scripts for installing and running tests.  

*(Adjust filenames and page classes to reflect your actual structure.)*

---

## Tests Included

1. **cart.spec.js**  
   - Verifies adding and removing items from the cart.  
   - Ensures cart updates correctly when quantities change.

2. **checkout.spec.js**  
   - Confirms checkout flow, including payment, shipping, and order confirmation.  
   - Validates error handling for incomplete or invalid payment details.

3. **filter.spec.js**  
   - Tests filtering functionality (e.g., category, price range).  
   - Ensures products are correctly displayed based on filter criteria.

4. **oauth.spec.js**  
   - Checks user login and logout with OAuth or standard login flow.  
   - Ensures correct handling of error messages for invalid credentials.

5. **search.spec.js**  
   - Validates search functionality to ensure accurate and relevant product results.  
   - Tests edge cases such as empty or invalid search queries.

6. **signup.spec.js**  
   - Confirms new user registration flow.  
   - Verifies form validations and successful account creation.

---

## Using the Page Object Model

Each **.spec.js** file references corresponding **page objects** (e.g., `LoginPage.js`, `CartPage.js`) that house locators and methods. This approach:

- **Centralizes** element selectors in one place for easy maintenance.  
- **Improves Readability** of test scripts by focusing on high-level steps rather than low-level browser interactions.  
- **Facilitates Reusability** across multiple tests since actions (e.g., `login()`, `addToCart()`) can be called repeatedly.

Example snippet from a test using POM:

```js
// Inside oauth.spec.js
import {test,expect} from '@playwright/test'
import { Auth } from '../pages/auth'
require('dotenv').config();

test.describe('User Authentication Test', ()=>{
    let auth;

    test.beforeEach('Navigate to Home Page ',async({page})=>{
        auth =  new Auth(page);

        // Navigate to the home page
        await auth.goHomepage();
    });

    test('User login successful',async ({page})=>{
        
        // Perform login with valid credentials
        await auth.login(process.env.EMAIL, process.env.PASSWORD);

        //Wait for the page to handle login 
        await page.waitForTimeout(2000);

        const isSuccessful = await auth.isLoginSuccessful();
        expect(isSuccessful).toBe(true);
    });

    test('User login fail',async({page})=>{
        
        // Perform login with invalid credentials
        await auth.login('david2020g@gmail.com','dav1234#')
        
        // Wait for the page to handle login
        await page.waitForTimeout(2000);

        const isSuccessful = await auth.isLoginSuccessful();
        const isErrorMessageVisible = await auth.isErrorMessageVisible();

        expect(isSuccessful).toBe(false);
        expect(isErrorMessageVisible).toBe(true);
    })
})
  // assertions...
});