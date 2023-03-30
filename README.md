[![ci](https://dev.azure.com/automationwithTim/healthmarkets-dtc-automation/_apis/build/status/bddwithTim.healthmarkets-dtc-automation?branchName=master)](https://dev.azure.com/automationwithTim/healthmarkets-dtc-automation/_build/latest?definitionId=1&branchName=master) [![build](https://dev.azure.com/automationwithTim/healthmarkets-dtc-automation/_apis/build/status/bddwithTim.healthmarkets-dtc-automation?branchName=master&isPr=true)](https://dev.azure.com/automationwithTim/healthmarkets-dtc-automation/_build?definitionId=1)

# Choice-DTC Automation

This repository houses the functional test suite for the Choice-DTC (eMarket) web application, leveraging the [Playwright](https://playwright.dev/) browser automation library. The project, also referred to as eMarket Automation, is built using TypeScript and aims to ensure the proper functionality and validation of the application's features.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Workflow Guides](#workflow-guides)
3. [Running Tests](#running-tests)
4. [Automation Limitations](#automation-limitations)

## Getting Started

### Prerequisites

Before proceeding with the setup, ensure that the following software is installed on your system:

- [Node.js](https://optum.service-now.com/euts_intake?id=appstore&q=Node.js) (version 16.14.2)
- [Visual Studio Code](https://optum.service-now.com/euts_intake?id=appstore&q=visual%20studio%20code) (version 1.68.1)
- [Git](https://optum.service-now.com/euts_intake?id=appstore&q=git). After installation, refer to [Getting Started with Git: Secure Remote Repository Access Guide](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Secure%20Remote%20Repository%20Access%20Guide.md).

### Setting up the Virtual Environment

To install the project dependencies, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the cloned repository directory.
3. Run `npm install` to install the required Node.js modules. Wait until the all dependencies have been installed.

## Workflow Guides

- [Getting Started with Git: Secure Remote Repository Access Guide](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Secure%20Remote%20Repository%20Access%20Guide.md)
- [Choice-DTC Test Script Authoring](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Playwright%20Test%20Script%20Authoring.md)
- [Commit and Push Workflow Guide](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Commit%20and%20Push%20Workflow%20Guide.md)

## Running Tests

To execute the tests, use the npm test command along with the appropriate environment and test targeting options:

### To run all tests

```console
npm test
```

- If there is no environment provided, by default the `model` environment is used.

### To run tests in a specific environment (e.g., model, supp, or prod)

```console
npm run test:model
```

### Run in headed mode

```console
npm test -- --headed
```

### Run specific tests using @tags (e.g., @smoke, @regression, etc.)

```console
npm test -- -g @smoke
```

- This command will execute and target tests that has `@smoke` tags.

```console
npm test -- -g @smoke -g @forms
```

- This command will execute and target tests that have both `@smoke` and `@forms` regardless of the arrangement of the tags in the test description.

For more CLI tests, refer to [Playwright CLI tests](https://playwright.dev/docs/test-cli)

## Automation Limitations

The current automation repository primarily supports functional testing for web applications on desktop browsers. However, it is important to note that mobile automation is not supported at this time.

Due to organizational restrictions at Optum, testing on Chromium and WebKit(Safari) browsers is not supported. As a result, the test suite is limited to running on browsers that comply with the organization's policies.

Please keep these limitations in mind when working with the Choice-DTC Web Automation project.

