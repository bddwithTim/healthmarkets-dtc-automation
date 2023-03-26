import { test } from '@playwright/test';

import { clickConsentToCookiesButton } from '@utils/pageHelpers';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

test.describe.skip('ACA - Basic flow @smoke @e2e @aca', () => {
  test('Quoting a single ACA plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // TODO: Add ACA flow

    await navigateToCensusPage(page);
    await clickConsentToCookiesButton(page);
  });
});
