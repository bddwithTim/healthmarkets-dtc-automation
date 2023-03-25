# Playwright Test Script Authoring

This document provides guidelines for authoring Playwright test scripts
in a consistent and maintainable manner. By following these guidelines,
the test scripts will be more readable, easier to maintain, and better
structured.

## Folder and File Naming Conventions

### Folders

- Folders should be named using kebab-case (words separated by
    hyphens, all lowercase). This makes them easier to read and is a
    widely-used convention in JavaScript and TypeScript projects.

### Test Files

- Test files should be named using the following convention:
    **featureName.test.ts**. The **featureName** should be descriptive
    and use camelCase. The **.test.ts** suffix indicates that it is a
    test file for a TypeScript project.

Examples:

- Generally, test files should be named like these:
    **shortTermMedical.test.ts, dental.test.ts, forms.test.ts.**

If a test file is specifically focused on end-to-end scenarios, you can
include the **.e2e** in the file name as well:

Example:

- For end-to-end scenarios related to dental plans:
    **shortTermMedical.e2e.test.ts**

### Class Files

- Class files, such as Page Object Classes, should be named using
    PascalCase (words without spaces, with each word's first letter
    capitalized, including the first word).

Example:

- For a Census page object class: **CensusPage.ts**

## Organizing and Grouping Imports

Organize and group imports according to their origin and purpose. In
general, follow these guidelines:

1. First, import packages and modules from the Playwright library.

2. Second, import utility functions and helpers.

3. Third, import page objects and custom components.

4. Finally, import test data, enums, and other resources.

Example:

![image](https://user-images.githubusercontent.com/89407715/227191282-49fd0c5a-e731-4007-baf8-c6ff583a9676.png)

## Test Descriptions and Tags

- **Description:** Use clear and concise test descriptions that
    explain the purpose of the test. The description should be easy to
    understand and communicate the intent of the test.

- **Tags:** Add relevant tags to your test using the **@tag** notation
    to help with filtering and organization. Tags can be used to group
    related tests, mark tests as smoke tests, or label tests by
    functionality.

Some common tags include **@smoke, @e2e, @regression**, or
feature-specific tags like **@STM, @aca, @dental**.

Example:

![image](https://user-images.githubusercontent.com/89407715/227191485-f6a409c3-86b5-4a75-bbdc-95d570cb7439.png)

Refer to the table below on what tags should be used for specific tests.

## Test Tags Categories and Descriptions

| Tag              | Description                                                           | Use Case                                                                                   |
|------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| @smoke           | Smoke tests, or basic tests that verify the application's stability   | For a small set of critical tests that should be run every time there's a new build or deployment |
| @e2e             | End-to-end tests that cover complete user workflows                  | For testing user workflows from start to finish, simulating a user's interaction with the application |
| @regression      | Regression tests that ensure no new bugs are introduced               | For running a comprehensive test suite to validate the application after changes, bug fixes, or new features |
| @ui              | User interface tests that focus on the visual elements                | For validating the appearance and functionality of user interface elements like buttons, forms, and navigation |
| @analytics       | Analytics tests that validate data tracking and reporting             | For verifying that data tracking and reporting mechanisms are working correctly, e.g., tracking user interactions |
| @forms           | Tests involving form handling, validation, and submission             | For tests related to filling up demographic fields, interacting with forms, and validating form submission behavior |
| @data_validation | Tests that focus on data validation and integrity                     | For tests that ensure the accuracy, completeness, and consistency of data within the application |
| @stm, @aca, @dental | Choice DTC line of business                                      | For tests related to specific plan types or categories |
| @prod            | Production environment specific tests                                | Only add this tag if the test scenario does NOT involve successful enrollment application. |

By using these tags, the tests can be efficiently organized and filtered based on their purpose and function.

## Guidelines for Writing Test Steps within the \`test()\` Function

- Start by initializing page object instances and defining any test
    data or variables needed for the test.

Example:

![image](https://user-images.githubusercontent.com/89407715/227191655-4777734d-a533-439c-a51e-bd260c023435.png)

- Perform any necessary setup steps, such as navigation or cookie
    consent.

- Add comments when necessary to provide a brief overview of the
    action being performed or to clarify complex logic.

- Use the **\`await\`** keyword to ensure that each action is
    completed before moving on to the next step.

- Implement checks for page loads or specific elements to be visible
    before interacting with them.

Example:

![image](https://user-images.githubusercontent.com/89407715/227191849-0a567d7c-0880-4c15-ae0a-bca4f6cacb38.png)

Following these guidelines will help create well-organized,
maintainable, and consistent Playwright test scripts.

Once you have finalized your changes, you can now start working on committing and pushing your changes. See [Commit and Push Workflow Guide](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Commit%20and%20Push%20Workflow%20Guide.md).
