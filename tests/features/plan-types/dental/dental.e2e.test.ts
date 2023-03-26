import { test } from '@playwright/test';
import UHODentalQuestionsPage from '@pages/uhc-enrollment/questions/DentalQuestionsPage';
import UHOPaymentAndBillingPage from '@pages/uhc-enrollment/PaymentAndBillingPage';
import UHOReviewAndSubmitPage from '@pages/uhc-enrollment/ReviewAndSubmitPage';

import { ApplicantType, LoadState, YesNoAnswer } from '@enums/enums';
import applicantInfo from '@data/applicant-information.json';
import payment from '@data/payment.json';
import {
  clickConsentToCookiesButton,
  clickUHOContinueBtn,
  waitForPageToLoad,
  waitForNewTab,
} from '@utils/pageHelpers';
import { getDateOfBirthFromAge, parseGender } from '@utils/utils';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

import CensusPage from '@pages/choice-dtc/CensusPage';
import DemographicsPage from '@pages/choice-dtc/DemographicsPage';
import QuotesPage from '@pages/choice-dtc/QuotesPage';
import CartPage from '@pages/choice-dtc/CartPage';
import UHOApplicantInfoPage from '@pages/uhc-enrollment/ApplicantInformationPage';

test.describe('Dental - Basic flow @smoke @e2e @dental', () => {
  test('Quoting a single Dental plan, add it to cart and finish the enrollment process', async ({
    page,
  }) => {
    // Page object instances
    const censusPage = new CensusPage(page);
    const demographicsPage = new DemographicsPage(page);
    const quotesPage = new QuotesPage(page);
    const cartPage = new CartPage(page);

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

    // Quotes page - filter and add a UHO Dental plan to cart
    await waitForPageToLoad(page, 'Dental Quotes', {
      loadState: LoadState.Load,
      timeout: 60000,
    });
    await quotesPage.waitForGoodNewsModalToBeDisplayed();
    await quotesPage.clickNoShowMeQuotesBtn();
    await quotesPage.filterByCompany('Golden Rule Insurance Co.');
    await quotesPage.clickFirstAddToCartButton();
    await quotesPage.clickGoToMyCartBtn();

    // Cart page - proceed to application
    await waitForPageToLoad(page, 'Shopping Cart');
    await cartPage.clickProceedToEnrollmentBtn();

    // Handling new tab as UHO applicant information page is opened in a new tab
    const pageSession = await waitForNewTab(page);

    // Fill UHO applicant information page
    const uhoApplicantInfoPage = new UHOApplicantInfoPage(pageSession);
    await waitForPageToLoad(pageSession, 'Applicant Information', {
      timeout: 60000,
    });

    // No need to fill out the applicant information page as it is pre-filled
    // from Choice DTC demographics page. Only the Resident Physical Address.
    await uhoApplicantInfoPage.fillResidentPhysicalAddress('general delivery');
    await uhoApplicantInfoPage.fillResidentCity('Dallas');
    await clickUHOContinueBtn(pageSession);

    // Answer dental questions
    const uhoDentalQuestionsPage = new UHODentalQuestionsPage(pageSession);
    await uhoDentalQuestionsPage.answerOtherCovReplaceQuestion(YesNoAnswer.No);
    await clickUHOContinueBtn(pageSession);

    // Payment & Billing - Summary wizard
    const uhoPaymentAndBillingPage = new UHOPaymentAndBillingPage(pageSession);
    await waitForPageToLoad(pageSession, 'Payment & Billing');
    await uhoPaymentAndBillingPage.waitForSummaryWizard();
    await clickUHOContinueBtn(pageSession);

    // Payment & Billing - Payment wizard
    await uhoPaymentAndBillingPage.waitForPaymentWizard();
    await uhoPaymentAndBillingPage.fillRoutingNumber(
      payment.electronicFundsTransfer.routingNumber
    );
    await uhoPaymentAndBillingPage.fillAccountNumber(
      payment.electronicFundsTransfer.accountNumber
    );
    await clickUHOContinueBtn(pageSession);

    // Review & Submit page
    const uhoReviewAndSubmitPage = new UHOReviewAndSubmitPage(pageSession);
    await waitForPageToLoad(pageSession, 'Review & Submit');

    await uhoReviewAndSubmitPage.clickTermsAndConditionsAcknowledgementCheckbox();
    await uhoReviewAndSubmitPage.clickHereToSign();
    await uhoReviewAndSubmitPage.clickSubmitYourApplication();

    // Verify the Thank you page
    await waitForPageToLoad(pageSession, 'Thank You', { timeout: 60000 });
  });
});
