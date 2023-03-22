import { Page } from '@playwright/test';
import { YesNoAnswer } from '@enums/enums';

export default class UHOShortTermMedicalQuestionsPage {
  private readonly page: Page;

  private shortTermMedicalQuestionsPageElements = {
    // buttons
    ContinueButton: '//span[text()="Continue >"]',

    // radio buttons
    // General Information
    DeclinedForInsurance: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_51021") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_51021") and text()="Yes"]',
    },
    LivedInUSAforLessThan: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_37243") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_37243") and text()="Yes"]',
    },
    UseTobacco: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_55480") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_55480") and and text()="Yes"]',
    },

    // Medical History Information
    FamilyMemberExpectant: {
      NoOption:
        '//label[contains(@for, "defaultQuestion_37253") and text()="No"]',
      YesOption:
        '//label[contains(@for, "defaultQuestion_37253") and and text()="Yes"]',
    },
    DiagMedDisorders: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_37258") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_37258") and and text()="Yes"]',
    },
    MedTestResults: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_37263") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_37263") and and text()="Yes"]',
    },
    DiagMedDisordersHIV: {
      NoOption:
        '//label[contains(@for, "applicantQuestion_37272") and text()="No"]',
      YesOption:
        '//label[contains(@for, "applicantQuestion_37272") and and text()="Yes"]',
    },

    // Other Coverage Information
    HaveInsuranceWillNotTerminate: {
      NoOption:
        '//label[contains(@for, "prevCovBenefits_37278") and text()="No"]',
      YesOption:
        '//label[contains(@for, "prevCovBenefits_37278") and and text()="Yes"]',
    },

    // For Applicants with Current Short Term Medical Coverage With Us
    OtherGRIShortTerm: {
      NoOption:
        '//label[contains(@for, "defaultQuestion_55507") and text()="No"]',
      YesOption:
        '//label[contains(@for, "defaultQuestion_55507") and and text()="Yes"]',
    },
  };

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnContinueBtn(): Promise<void> {
    await this.page.click(
      this.shortTermMedicalQuestionsPageElements.ContinueButton
    );
  }

  async answerDeclinedForInsuranceQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    During the past 5 years, has any applicant been declined for insurance by a carrier other 
    than Golden Rule Insurance Company due to health reasons? The person(s) named will not be 
    covered under the policy/certificate. 
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DeclinedForInsurance
            .NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DeclinedForInsurance
            .YesOption
        );
  }

  async answerLivedInUSAforLessThanQuestion(
    answer: YesNoAnswer
  ): Promise<void> {
    /*
    Question:
    Has any applicant lived in the 50 states of the USA or the District of Columbia for less than 
    the past 12 months? The person(s) named will not be covered under the policy/certificate. 
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.LivedInUSAforLessThan
            .NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.LivedInUSAforLessThan
            .YesOption
        );
  }

  async answerUseTobaccoQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    During the past 12 months, has any applicant smoked cigarettes or e-cigarettes 
    or used tobacco in any form (including smokeless tobacco) or nicotine substitute?
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.UseTobacco.NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.UseTobacco.YesOption
        );
  }

  async answerFamilyMemberExpectantQuestion(
    answer: YesNoAnswer
  ): Promise<void> {
    /*
    Question:
    Is any applicant currently pregnant, an expectant parent, in the process of adopting a child, 
    or undergoing infertility treatment? If yes, coverage cannot be issued.
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.FamilyMemberExpectant
            .NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.FamilyMemberExpectant
            .YesOption
        );
  }

  async answerDiagMedDisordersQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    Within the last 5 years, has any applicant received medical or surgical consultation, advice, 
    or treatment, including medication, for any of the following: blood disorders, liver disorders, 
    kidney disorders, chronic obstructive pulmonary disorder (COPD) or emphysema, diabetes, cancer, 
    multiple sclerosis, heart or circulatory system disorders (excluding high blood pressure), 
    Crohn’s disease or ulcerative colitis, or alcohol or drug abuse or immune system disorders? 
    The person(s) named will not be covered under the policy/certificate.
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DiagMedDisorders.NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DiagMedDisorders.YesOption
        );
  }

  async answerMedTestResultsQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    During the past 12 months, has any applicant been advised to undergo any test 
    (except for HIV test), treatment, hospitalization, or surgery which has not yet been 
    completed or for which results have not yet been received? The person(s) named will 
    not be covered under the policy/certificate.
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.MedTestResults.NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.MedTestResults.YesOption
        );
  }

  async answerDiagMedDisordersHIVQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    Within the last 5 years, has any applicant received treatment, advice, medication, or surgical 
    consultation for HIV infection from a doctor or other licensed clinical professional, or had a 
    positive test for HIV infection performed by a doctor or other licensed clinical professional? 
    The person(s) named will not be covered under the policy/certificate.
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DiagMedDisordersHIV
            .NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.DiagMedDisordersHIV
            .YesOption
        );
  }

  async answerHaveInsuranceWillNotTerminateQuestion(
    answer: YesNoAnswer
  ): Promise<void> {
    /*
    Question:
    Does any applicant have, or is any applicant currently applying for, other hospital or medical 
    expense insurance that will not terminate prior to the requested effective date? 
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements
            .HaveInsuranceWillNotTerminate.NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements
            .HaveInsuranceWillNotTerminate.YesOption
        );
  }

  async answerOtherGRIShortTermQuestion(answer: YesNoAnswer): Promise<void> {
    /*
    Question:
    Does any applicant currently have short term limited duration medical insurance coverage 
    with Golden Rule Insurance Company that will not terminate prior to the requested 
    effective date?
    */
    answer === YesNoAnswer.No
      ? await this.page.click(
          this.shortTermMedicalQuestionsPageElements.OtherGRIShortTerm.NoOption
        )
      : await this.page.click(
          this.shortTermMedicalQuestionsPageElements.OtherGRIShortTerm.YesOption
        );
  }

  async answerShortTermMedicalQuestions(answers: {
    declinedForInsurance: YesNoAnswer;
    livedInUSAforLessThan: YesNoAnswer;
    useTobacco: YesNoAnswer;
    familyMemberExpectant: YesNoAnswer;
    diagMedDisorders: YesNoAnswer;
    medTestResults: YesNoAnswer;
    diagMedDisordersHIV: YesNoAnswer;
    haveInsuranceWillNotTerminate: YesNoAnswer;
    otherGRIShortTerm: YesNoAnswer;
  }): Promise<void> {
    await this.answerDeclinedForInsuranceQuestion(answers.declinedForInsurance);
    await this.answerLivedInUSAforLessThanQuestion(
      answers.livedInUSAforLessThan
    );
    await this.answerUseTobaccoQuestion(answers.useTobacco);
    await this.answerFamilyMemberExpectantQuestion(
      answers.familyMemberExpectant
    );
    await this.answerDiagMedDisordersQuestion(answers.diagMedDisorders);
    await this.answerMedTestResultsQuestion(answers.medTestResults);
    await this.answerDiagMedDisordersHIVQuestion(answers.diagMedDisordersHIV);
    await this.answerHaveInsuranceWillNotTerminateQuestion(
      answers.haveInsuranceWillNotTerminate
    );
    await this.answerOtherGRIShortTermQuestion(answers.otherGRIShortTerm);
  }
}
