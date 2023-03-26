import { test } from '@playwright/test';

import { clickConsentToCookiesButton } from '@utils/pageHelpers';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

test.describe.skip(
  'Supplemental - Basic flow @smoke @e2e @supplemental',
  () => {
    test('Quoting a single Supplemental plan, add it to cart and finish the enrollment process', async ({
      page,
    }) => {
      // TODO: Add Supplemental flow

      await navigateToCensusPage(page);
      await clickConsentToCookiesButton(page);
    });
  }
);
