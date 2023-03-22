import { Page } from '@playwright/test';

export async function navigateToCensusPage(page: Page): Promise<void> {
  await page.goto(`${process.env.BASE_URL}${process.env.TOKEN}`);
}

export default class CensusPage {
  private readonly page: Page;

  private censusPageElements = {
    // buttons
    letsGoBtn: 'p:has-text("Let\'s Go!")',

    // checkboxes
    ACACheckBox: 'id=rdo_aca_health insurance',
    MedicareCheckBox: 'id=rdo_medicare_insurance',
    STMCheckBox: 'id=rdo_short_term health insurance',

    // input fields
    county: 'id=county',
    zipCode: 'input#zipCode',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillZipCodeField(zipCode: string): Promise<void> {
    await this.page.fill(this.censusPageElements.zipCode, zipCode);
  }

  async clickOnMedicareCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.MedicareCheckBox).click();
  }

  async clickOnACACheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.ACACheckBox).click();
  }

  async clickOnSTMCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.STMCheckBox).click();
  }

  async clickOnLetsGoButton(): Promise<void> {
    // playwright has an auto-wait feature for click events
    // but for some reason, it doesn't work on this particular button
    // so we have to add a manual wait
    await this.page.waitForTimeout(1000);
    await this.page.click(this.censusPageElements.letsGoBtn);
  }

  async clickOnCountySelection(): Promise<void> {
    await this.page.waitForSelector(this.censusPageElements.county);
    await this.page.locator(this.censusPageElements.county).click();
  }

  async selectCounty(county: string): Promise<void> {
    await this.page.locator(`//li[@data-value="${county}"]`).click();
  }
}
