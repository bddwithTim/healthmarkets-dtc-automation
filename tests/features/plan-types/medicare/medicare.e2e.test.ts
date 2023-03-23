import { test } from '@playwright/test';

import { clickConsentToCookiesButton } from '@utils/pageHelpers';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

test.describe('Medicare - Basic flow @smoke @e2e @medicare', () => {
  test('Quoting a single Medicare plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // Page object instances

    // Navigate to Census page and accept cookies
    await navigateToCensusPage(page);
    await clickConsentToCookiesButton(page);
  });
});
