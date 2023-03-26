import { Page } from '@playwright/test';
import { waitForNewTab } from '@utils/pageHelpers';
import { ApplicationType } from '@enums/enums';

export default class MoreInfoNeededPage {
  private readonly page: Page;

  private readonly MoreInfoNeededPageElements = {
    // buttons
    btnContinue: '//span[text()="Continue to next step"]',

    // input fields
    contactEmail: 'id=email',
    firstName: 'id=firstName',
    lastName: 'id=lastName',
    phoneNumber: 'id=phoneNumber',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillPhoneNumberField(phoneNumber: string): Promise<void> {
    await this.page.fill(
      this.MoreInfoNeededPageElements.phoneNumber,
      phoneNumber
    );
  }

  async fillFirstNameField(firstName: string): Promise<void> {
    await this.page.fill(this.MoreInfoNeededPageElements.firstName, firstName);
  }

  async fillLastNameField(lastName: string): Promise<void> {
    await this.page.fill(this.MoreInfoNeededPageElements.lastName, lastName);
  }

  async clickContinueBtn(
    appType: ApplicationType | null = null
  ): Promise<Page | null> {
    // playwright has an auto-wait feature for click events
    // but for some reason, it doesn't work on this particular button
    // so we have to add a manual wait
    await this.page.waitForTimeout(1000);

    // There is a low priority issue  in supp environment wherein
    // if the user has quoted for an STM plan, the UHO Applicant
    // information page is opened in a new tab
    // instead of just staying on the same page session
    if (appType === ApplicationType.STM && process.env.test_env === 'supp') {
      await this.page.click(this.MoreInfoNeededPageElements.btnContinue);
      const newTab = await waitForNewTab(this.page);
      return newTab;
    }

    await this.page.click(this.MoreInfoNeededPageElements.btnContinue);
    return null;
  }
}
