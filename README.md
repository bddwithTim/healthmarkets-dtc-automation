# Choice-DTC Automation

This repository contains the functional test suite for our web application using [Playwright](https://playwright.dev/), a popular browser automation library.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Running Tests](#running-tests)
4. [Workflow Guides](#workflow-guides)
5. [Automation Constraints](#automation-constraints)

## Overview

Choice-DTC Automation, also known as eMarket Automation, is a functional testing project for the Choice-DTC (eMarket) web application. The project utilizes Playwright, a popular browser automation library, and is written in TypeScript. The primary focus of the test suite is to verify and validate the functional aspects of the application.

## Getting Started

### Prerequisites

Before proceeding with the setup, ensure that the following software is installed on your system:

- [Node.js](https://optum.service-now.com/euts_intake?id=appstore&q=Node.js) (version 16.14.2)
- [Visual Studio Code](https://optum.service-now.com/euts_intake?id=appstore&q=visual%20studio%20code) (version 1.68.1)

### Virtual environment setup

To install the project dependencies, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the cloned repository directory.
3. Run `npm install` to install the required Node.js modules. Wait until the all dependencies have been installed.

## Running Tests

To execute the tests, use the npm test command along with the appropriate environment and test targeting options:

### To run all tests

```sh
npm test
```

- If there is no environment provided, by default the `model` environment is used.

### To run tests in a specific environment (e.g., model, supp, or prod)

```sh
npm run test:model
```

### Run in headed mode

```sh
npm test -- --headed
```

### Run specific tests using @tags (e.g., @smoke, @regression, etc.)

```sh
npm test -- -g @smoke
```

- This command will execute and target tests that has `@smoke` tags.

```sh
npm test -- -g @smoke -g @forms
```

- This command will execute and target tests that have both `@smoke` and `@forms` regardless of the arrangement of the tags in the test description.

For more CLI tests, refer to [Playwright CLI tests](https://playwright.dev/docs/test-cli)

## Workflow Guides

- [Commit and Push Workflow Guide](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Commit%20and%20Push%20Workflow%20Guide.md)
- [Playwright Test Script Authoring](https://github.com/bddwithTim/healthmarkets-dtc-automation/blob/master/docs/Playwright%20Test%20Script%20Authoring.md)

## Automation Constraints

This automation repository currently supports functional testing for web applications on desktop browsers. Please note that mobile automation is not supported at this time.

Due to Optum restrictions, testing on Chromium and WebKit browsers is not supported. The test suite is limited to running on the supported browsers as per the organization's policy.

Please be aware of these constraints when working with the Choice-DTC Automation project.
