import { Page } from '@playwright/test';

export default class QuotesPage {
  constructor(private page: Page) {
    this.page = page;
  }

  private quotesPageElements = {
    // buttons
    btnProceedToEnrollment: 'id=ProceedToEnrollmentButton',
  };

  async clickProceedToEnrollmentBtn(): Promise<void> {
    await this.page
      .locator(this.quotesPageElements.btnProceedToEnrollment)
      .click();
  }
}
