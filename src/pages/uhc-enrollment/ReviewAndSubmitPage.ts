import { Page } from '@playwright/test';

export default class UHOReviewAndSubmitPagePage {
  private readonly page: Page;

  private reviewAndSubmitPageElements = {
    // electronic signature elements
    membershipAcknowledgementCheckbox: 'label[for="hasAcknowledgedFact_0"]',
    termsAndConditionsAcknowledgementCheckbox: 'label[for="hasAcknowledged_"]',
    clickHereToSign: 'text=Click Here to Sign',

    // buttons
    btnSubmitYourApplication: '(//span[text()="Submit Your Application"])[1]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async clickMembershipAcknowledgementCheckbox(): Promise<void> {
    /*
    I hereby enroll in the Federation of American Consumers and Travelers (FACT) at the 
    Basic Membership level ($10 a month). This membership gives access to apply 
    for this insurance product.
    */
    await this.page.click(
      this.reviewAndSubmitPageElements.membershipAcknowledgementCheckbox
    );
  }

  async clickTermsAndConditionsAcknowledgementCheckbox(): Promise<void> {
    /*
    I (we) have reviewed, understand, and agree that by applying for coverage and 
    by providing my (our) electronic signature below, I (we) am (are) agreeing to: ...
    */
    await this.page.click(
      this.reviewAndSubmitPageElements.termsAndConditionsAcknowledgementCheckbox
    );
  }

  async clickHereToSign(): Promise<void> {
    // additional pre-caution to prevent successful enrollment in production environment
    if (process.env.test_env === 'prod') {
      throw new Error('Not allowed in production environment!');
    }
    await this.page.click(this.reviewAndSubmitPageElements.clickHereToSign);
  }

  async clickSubmitYourApplication(): Promise<void> {
    // additional pre-caution to prevent successful enrollment in production environment
    if (process.env.test_env === 'prod') {
      throw new Error('Not allowed in production environment!');
    }
    await this.page.click(
      this.reviewAndSubmitPageElements.btnSubmitYourApplication
    );
  }
}
