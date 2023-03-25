import { Page } from '@playwright/test';

export async function navigateToCensusPage(page: Page): Promise<void> {
  await page.goto(`${process.env.BASE_URL}${process.env.TOKEN}`);
}

export default class CensusPage {
  private readonly page: Page;

  private censusPageElements = {
    // buttons
    letsGoBtn: 'button[id*=submit-button]',

    // checkboxes
    ACACheckBox: 'id=rdo_aca_health insurance',
    dentalCheckBox: 'id=rdo_dental_insurance',
    medicareCheckBox: 'id=rdo_medicare_insurance',
    STMCheckBox: 'id=rdo_short_term health insurance',
    supplementalCheckBox: 'id=rdo_supplemental_insurance',
    visionCheckBox: 'id=rdo_vision_insurance',

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

  async clickMedicareCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.medicareCheckBox).click();
  }

  async clickACACheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.ACACheckBox).click();
  }

  async clickSTMCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.STMCheckBox).click();
  }

  async clickDentalCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.dentalCheckBox).click();
  }

  async clickVisionCheckBox(): Promise<void> {
    await this.page.locator(this.censusPageElements.visionCheckBox).click();
  }

  async clickSupplementalCheckBox(): Promise<void> {
    await this.page
      .locator(this.censusPageElements.supplementalCheckBox)
      .click();
  }

  async clickLetsGoButton(): Promise<void> {
    // playwright has an auto-wait feature for click events
    // but for some reason, it doesn't work on this particular button
    // so we have to add a manual wait
    await this.page.waitForTimeout(1000);
    await this.page.click(this.censusPageElements.letsGoBtn);
  }

  async clickCountySelection(): Promise<void> {
    await this.page.waitForSelector(this.censusPageElements.county);
    await this.page.locator(this.censusPageElements.county).click();
  }

  async selectCounty(county: string): Promise<void> {
    await this.page.locator(`//li[@data-value="${county}"]`).click();
  }
}
