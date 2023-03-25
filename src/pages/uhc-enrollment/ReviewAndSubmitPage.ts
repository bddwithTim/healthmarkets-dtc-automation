import { Page } from '@playwright/test';

export default class UHOReviewAndSubmitPagePage {
  private readonly page: Page;

  private reviewAndSubmitPageElements = {
    // electronic signature elements
    firstAcknowledgementCheckbox: 'label[for="hasAcknowledgedFact_0"]',
    secondAcknowledgementCheckbox: 'label[for="hasAcknowledged_"]',
    clickHereToSign: 'text=Click Here to Sign',

    // buttons
    btnSubmitYourApplication: '(//span[text()="Submit Your Application"])[1]',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async clickFirstAcknowledgementCheckbox(): Promise<void> {
    /*
    I hereby enroll in the Federation of American Consumers and Travelers (FACT) at the 
    Basic Membership level ($10 a month). This membership gives access to apply 
    for this insurance product.
    */
    await this.page.click(
      this.reviewAndSubmitPageElements.firstAcknowledgementCheckbox
    );
  }

  async clickSecondAcknowledgementCheckbox(): Promise<void> {
    /*
    I (we) have reviewed, understand, and agree that by applying for coverage and 
    by providing my (our) electronic signature below, I (we) am (are) agreeing to: ...
    */
    await this.page.click(
      this.reviewAndSubmitPageElements.secondAcknowledgementCheckbox
    );
  }

  async clickHereToSign(): Promise<void> {
    // additional pre-caution to prevent successful enrollment in production environment
    if (process.env.test_env === 'prod') {
      console.log('Not allowed in production environment!');
      return;
    }
    await this.page.click(this.reviewAndSubmitPageElements.clickHereToSign);
  }

  async clickSubmitYourApplication(): Promise<void> {
    await this.page.click(
      this.reviewAndSubmitPageElements.btnSubmitYourApplication
    );
  }
}
