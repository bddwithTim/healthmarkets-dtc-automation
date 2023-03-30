#!/bin/bash

# Fetch the origin/master branch reference
git fetch origin

# Check if this is a pull request
if [ "$BUILD_REASON" == "PullRequest" ]; then
  # Get the target branch
  TARGET_BRANCH="origin/$(echo $SYSTEM_PULLREQUEST_TARGETBRANCH)"

  # Get a list of changed files
  CHANGED_FILES=$(git diff --name-only --diff-filter=d $TARGET_BRANCH)

  # Filter out the test files
  CHANGED_TESTS=$(echo "$CHANGED_FILES" | grep -E '^path/to/tests/.*\.test\.ts$')

  if [ -z "$CHANGED_TESTS" ]; then
    echo "No test files changed. Skipping tests."
    exit 0
  fi

  # Run tests for changed files
  echo "Running tests for changed files:"
  echo "$CHANGED_TESTS"

  npm run test -- --grep "$(echo "$CHANGED_TESTS" | sed -e 's/[^[:alnum:]_-]/\\&/g' | paste -sd '|' -)"
else
  # Run the test:model and test:supp scripts
  echo "Running test:model and test:supp scripts"
  npm run test:model
  npm run test:supp
fi
