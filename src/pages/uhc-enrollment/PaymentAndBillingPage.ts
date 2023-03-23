import { Page } from '@playwright/test';
import {
  hasUHOSpinner,
  waitForUHOSpinnerToDisappear,
} from '@utils/pageHelpers';

export default class UHOPaymentAndBillingPage {
  private readonly page: Page;

  private paymentAndBillingPageElements = {
    // headers
    summaryHeader: 'text=Summary',
    paymentHeader: 'text=Payment',

    // Payment & Billing - Payment page radio buttons
    checkingAccount: 'text=Checking',
    savingsAccount: 'text=Savings',

    // input fields
    routingNumber: 'id=routingNumber',
    accountNumber: 'id=bankAccountNumber',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSummaryWizard(): Promise<void> {
    await this.page.waitForSelector(
      this.paymentAndBillingPageElements.summaryHeader
    );

    if (await hasUHOSpinner(this.page)) {
      await waitForUHOSpinnerToDisappear(this.page);
    }
  }

  async waitForPaymentWizard(): Promise<void> {
    await this.page.waitForSelector(
      this.paymentAndBillingPageElements.paymentHeader
    );

    if (await hasUHOSpinner(this.page)) {
      await waitForUHOSpinnerToDisappear(this.page);
    }
  }

  async fillRoutingNumber(routingNumber: string): Promise<void> {
    await this.page.fill(
      this.paymentAndBillingPageElements.routingNumber,
      routingNumber
    );

    if (await hasUHOSpinner(this.page)) {
      await waitForUHOSpinnerToDisappear(this.page);
    }
  }

  async fillAccountNumber(accountNumber: string): Promise<void> {
    await this.page.fill(
      this.paymentAndBillingPageElements.accountNumber,
      accountNumber
    );
  }

  async selectCheckingAccount(): Promise<void> {
    await this.page.click(this.paymentAndBillingPageElements.checkingAccount);
  }

  async selectSavingsAccount(): Promise<void> {
    await this.page.click(this.paymentAndBillingPageElements.savingsAccount);
  }
}
