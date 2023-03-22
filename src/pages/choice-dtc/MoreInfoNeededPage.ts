import { Page } from '@playwright/test';

export default class MoreInfoNeededPage {

  private readonly page: Page;

  private readonly MoreInfoNeededPageElements = {
    // buttons
    btnContinue: '//span[text()=\'Continue to next step\']',

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

  async clickContinueBtn(): Promise<void | Page> {
    // There is an issue (low priority) in supp environment wherein 
    // it will open a new tab for UHO Applicant information page
    // instead of just staying on the same page session
    if(process.env.test_env === 'supp'){
      const [newTab] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.click(this.MoreInfoNeededPageElements.btnContinue),
      ]);
      return newTab;
    }

    // playwright has an auto-wait feature for click events
    // but for some reason, it doesn't work on this particular button
    // so we have to add a manual wait
    await this.page.waitForTimeout(1000); 
    await this.page.click(this.MoreInfoNeededPageElements.btnContinue);
  }
}
