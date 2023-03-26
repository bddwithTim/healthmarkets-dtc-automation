import { test } from '@playwright/test';

import { clickConsentToCookiesButton } from '@utils/pageHelpers';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

test.describe.skip('Vision - Basic flow @smoke @e2e @aca', () => {
  test('Quoting a single Vision plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // TODO: Add Vision flow

    await navigateToCensusPage(page);
    await clickConsentToCookiesButton(page);
  });
});
