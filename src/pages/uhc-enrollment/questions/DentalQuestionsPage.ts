import { Page } from '@playwright/test';
import { YesNoAnswer } from '@enums/enums';

export default class UHODentalQuestionsPage {
  private readonly page: Page;

  private dentalQuestionsPageElements = {
    OtherCovReplace: {
      NoOption:
        '//label[contains(@for, "otherCoverage_42069_showApplicants_0") and text()="No"]',
      YesOption:
        '//label[contains(@for, "otherCoverage_42069_showApplicants_1") and text()="Yes"]',
    },
  };

  constructor(page: Page) {
    this.page = page;
  }

  async answerOtherCovReplaceQuestion(answer: YesNoAnswer): Promise<void> {
    /*
        Does any applicant intend to replace any existing coverage in force?
        */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.dentalQuestionsPageElements.OtherCovReplace.NoOption
        )
      : await this.page.click(
          this.dentalQuestionsPageElements.OtherCovReplace.YesOption
        );
  }
}
