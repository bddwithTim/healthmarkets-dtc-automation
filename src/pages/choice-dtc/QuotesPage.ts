import { Page } from '@playwright/test';

export default class QuotesPage {
  constructor(private page: Page) {
    this.page = page;
  }

  private quotesPageElements = {
    // buttons
    btnContinueOnline: 'role=button[name="Continue Online"]',
    btnFirstAddToCart: '(//span[text()="Add To Cart"])[1]',
    btnGoToMyCart: 'Go to My Cart',
    btnLoadMorePlans: '//button[contains(@id, "show-more-plans")]',
    btnProceedToApplication: 'Proceed To Application',

    // labels
    paginationLabel:
      '//p[contains(text(), "You are viewing") and contains(text(), "plans.")]',

    // links
    clearAllFilters: 'text=Clear All Filters',

    // Good News Modal section
    goodNewsModal: 'div.plansfound-good-news',
    noShowMeQuotesBtn: 'span:has-text("No, Show Me Quotes")',
  };

  async clickFirstAddToCartButton(): Promise<void> {
    await this.page.click(this.quotesPageElements.btnFirstAddToCart);
  }

  async clickGoToMyCartBtn(): Promise<void> {
    await this.page
      .getByRole('button', { name: `${this.quotesPageElements.btnGoToMyCart}` })
      .click();
  }

  async clickContinueOnlineBtn(): Promise<void> {
    await this.page.waitForSelector(this.quotesPageElements.btnContinueOnline, {
      timeout: 300000,
      state: 'visible',
    });
    await this.page.click(this.quotesPageElements.btnContinueOnline);
  }

  async clickProceedToApplicationBtn(): Promise<void> {
    await this.page
      .getByRole('button', {
        name: `${this.quotesPageElements.btnProceedToApplication}`,
      })
      .click();
  }

  async isAppBarTabDisplayed(tabName: string): Promise<boolean> {
    const activeTabTitle = await this.page.$eval(
      '.app-bar-tab.active .app-bar-tab-title',
      (element) => element?.textContent?.trim()
    );
    return activeTabTitle === tabName;
  }

  async waitForGoodNewsModalToBeDisplayed({
    timeout = 60000,
  }: { timeout?: number } = {}): Promise<void> {
    await this.page.waitForSelector(this.quotesPageElements.goodNewsModal, {
      timeout: timeout,
      state: 'visible',
    });
  }

  async isModalDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.quotesPageElements.goodNewsModal);
  }

  async clickNoShowMeQuotesBtn(): Promise<void> {
    const modal = await this.isModalDisplayed();
    if (modal) {
      await this.page.click(this.quotesPageElements.noShowMeQuotesBtn);
    }
  }

  async loadMorePlans(): Promise<void> {
    while (!(await this._checkIfNumPlansDisplayedEqualTotalPlans())) {
      await this.page.click(this.quotesPageElements.btnLoadMorePlans);
    }
  }

  async _checkIfNumPlansDisplayedEqualTotalPlans(): Promise<boolean> {
    const str = await this.page.innerText(
      this.quotesPageElements.paginationLabel
    );
    const paginationLabelArray = str.match(/\d+/g);

    if (!paginationLabelArray) {
      throw new Error('paginationLabelArray is empty');
    }
    return paginationLabelArray[0] === paginationLabelArray[1];
  }

  async filterByCompany(companyName: string, timeout = 10000): Promise<void> {
    const companyNameCheckbox = `h6:text("${companyName}")`;
    await this.page.waitForSelector(companyNameCheckbox, { timeout });
    await this.page.click(companyNameCheckbox);

    const isDisplayed = await this.isCompanyDisplayedInTheFilter(
      companyName,
      timeout
    );

    if (!isDisplayed) {
      throw new Error(`Company ${companyName} is not displayed in the filter`);
    }
  }

  async isCompanyDisplayedInTheFilter(
    companyName: string,
    timeout = 10000
  ): Promise<boolean> {
    const filteredCompanyName = `p:text("Company : ${companyName}")`;
    await this.page.waitForSelector(filteredCompanyName, { timeout });
    return await this.page.isVisible(filteredCompanyName);
  }

  async clearAllFilters(): Promise<void> {
    await this.page.click(this.quotesPageElements.clearAllFilters);
  }
}
