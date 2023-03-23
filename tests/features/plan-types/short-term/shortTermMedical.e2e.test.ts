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

test.describe('STM - Basic flow @smoke @e2e @stm', () => {
  test('Quoting a single UHO STM plan, add it to cart and finish the enrollment process', async ({
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
    await censusPage.clickOnSTMCheckBox();
    await censusPage.clickOnLetsGoButton();

    // Fill demographics details
    await waitForPageToLoad(page, 'Contact Information');
    await demographicsPage.fillDemographicsInfo(ApplicantType.Primary, {
      dob: dateOfBirth,
      gender: parseGender(applicantInfo.primary.gender),
      isParent: YesNoAnswer.No,
      isTobaccoUser: YesNoAnswer.No,
    });

    await demographicsPage.clickSeeQuotesBtn();

    // Quotes page - filter and add a UHO STM plan to cart
    await waitForPageToLoad(page, 'Health Quotes', {
      loadState: LoadState.NetworkIdle,
      timeout: 60000,
    });
    await quotesPage.filterByCompany('Golden Rule Insurance Co.');
    await quotesPage.clickFirstAddToCartButton();
    await quotesPage.clickGoToMyCartBtn();

    // Cart page - proceed to application
    await waitForPageToLoad(page, 'Shopping Cart');
    await quotesPage.clickProceedToApplicationBtn();

    // Fill more information needed page
    await waitForPageToLoad(page, 'More Information Needed');
    await moreInfoNeededPage.fillPhoneNumberField(
      applicantInfo.primary.phoneNumber
    );
    await moreInfoNeededPage.fillFirstNameField(
      applicantInfo.primary.firstName
    );
    await moreInfoNeededPage.fillLastNameField(applicantInfo.primary.lastName);

    // handling new tab if test environment is supp
    const pageSession = (await moreInfoNeededPage.clickContinueBtn()) ?? page;

    // Fill UHO applicant information page
    const uhoApplicantInfoPage = new UHOApplicantInfoPage(pageSession);
    await waitForPageToLoad(pageSession, 'Applicant Information', {
      timeout: 60000,
    });
    await uhoApplicantInfoPage.fillPrimaryApplicantInfo({
      height: { feet: 5, inches: 5 },
      weight: { lbs: 123 },
      emailAddress: applicantInfo.primary.emailAddress,
    });
    await uhoApplicantInfoPage.fillResidentPhysicalAddress('general delivery');
    await uhoApplicantInfoPage.fillResidentCity('Dallas');
    await uhoApplicantInfoPage.clickOnContinueBtn();

    // Answer short term medical questions
    await waitForPageToLoad(pageSession, 'Short Term Questions', {
      loadState: LoadState.NetworkIdle,
    });
    const uhoShortTermQuestionsPage = new UHOShortTermMedicalQuestionsPage(
      pageSession
    );
    await uhoShortTermQuestionsPage.answerShortTermMedicalQuestions({
      declinedForInsurance: YesNoAnswer.No,
      livedInUSAforLessThan: YesNoAnswer.No,
      useTobacco: YesNoAnswer.No,
      familyMemberExpectant: YesNoAnswer.No,
      diagMedDisorders: YesNoAnswer.No,
      medTestResults: YesNoAnswer.No,
      diagMedDisordersHIV: YesNoAnswer.No,
      haveInsuranceWillNotTerminate: YesNoAnswer.No,
      otherGRIShortTerm: YesNoAnswer.No,
    });
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

    await uhoReviewAndSubmitPage.clickFirstAcknowledgementCheckbox();
    await uhoReviewAndSubmitPage.clickSecondAcknowledgementCheckbox();
    await uhoReviewAndSubmitPage.clickHereToSign();
    await uhoReviewAndSubmitPage.clickSubmitYourApplication();

    // Verify the Thank you page
    await waitForPageToLoad(pageSession, 'Thank You', { timeout: 60000 });
  });
});
