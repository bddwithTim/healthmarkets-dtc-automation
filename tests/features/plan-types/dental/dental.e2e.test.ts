import { test } from '@playwright/test';

import {
  clickConsentToCookiesButton,
  clickUHOContinueBtn,
  waitForPageToLoad,
} from '@utils/pageHelpers';
import { getDateOfBirthFromAge, parseGender } from '@utils/utils';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

import CensusPage from '@pages/choice-dtc/CensusPage';
import DemographicsPage from '@pages/choice-dtc/DemographicsPage';
import QuotesPage from '@pages/choice-dtc/QuotesPage';
import MoreInfoNeededPage from '@pages/choice-dtc/MoreInfoNeededPage';
import UHOApplicantInfoPage from '@pages/uhc-enrollment/ApplicantInformationPage';
import UHOShortTermMedicalQuestionsPage from '@pages/uhc-enrollment/questions/ShortTermMedicalQuestions';
import UHOPaymentAndBillingPage from '@pages/uhc-enrollment/PaymentAndBillingPage';
import UHOReviewAndSubmitPage from '@pages/uhc-enrollment/ReviewAndSubmitPage';

import { ApplicantType, LoadState, YesNoAnswer } from '@enums/enums';
import applicantInfo from '@data/applicant-information.json';
import payment from '@data/payment.json';

test.describe.only('Dental - Basic flow @smoke @e2e @dental', () => {
  test('Quoting a single Dental plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // Page object instances
    const censusPage = new CensusPage(page);
    const demographicsPage = new DemographicsPage(page);
    const quotesPage = new QuotesPage(page);
    const moreInfoNeededPage = new MoreInfoNeededPage(page);

    // Test data
    const zipCode = '75221';
    const dateOfBirth = await getDateOfBirthFromAge(applicantInfo.primary.age);

    // Navigate to Census page and accept cookies
    await navigateToCensusPage(page);
    await clickConsentToCookiesButton(page);

    // Fill census details
    await censusPage.fillZipCodeField(zipCode);
    await censusPage.clickDentalCheckBox();
    await censusPage.clickLetsGoButton();

    // Fill demographics details
    await waitForPageToLoad(page, 'Contact Information');
    await demographicsPage.fillDemographicsInfo(ApplicantType.Primary, {
      phoneNumber: '(999) 999-9999',
      email: applicantInfo.primary.emailAddress,
      firstName: applicantInfo.primary.firstName,
      lastName: applicantInfo.primary.lastName,
      dob: dateOfBirth,
      gender: parseGender(applicantInfo.primary.gender),
    });

    await demographicsPage.clickSeeQuotesBtn();

    // Quotes page
    await waitForPageToLoad(page, 'Dental Quotes', {
      loadState: LoadState.Load,
      timeout: 60000,
    });
    await quotesPage.waitForGoodNewsModalToBeDisplayed();
    await quotesPage.clickNoShowMeQuotesBtn();

    await page.pause();
  });
});
