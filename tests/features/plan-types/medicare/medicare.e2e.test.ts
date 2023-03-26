import { test } from '@playwright/test';

import { clickConsentToCookiesButton } from '@utils/pageHelpers';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

test.describe.skip('Medicare - Basic flow @smoke @e2e @medicare', () => {
  test('Quoting a single Medicare plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // TODO: Add Medicare flow

    await navigateToCensusPage(page);
    await clickConsentToCookiesButton(page);
  });
});
