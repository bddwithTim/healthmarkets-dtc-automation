import { Page } from '@playwright/test';
import { YesNoAnswer, Gender, ApplicantType } from '@enums/enums';
import { isValidDateOfBirthFormat } from '@utils/utils';

interface DemographicsInfo {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: Gender;
  annualIncome?: number;
  isParent?: YesNoAnswer;
  isTobaccoUser?: YesNoAnswer;
  householdMembers?: number;
  email?: string;
  phoneNumber?: string;
}

export default class DemographicsPage {
  private readonly page: Page;

  private demographicsPageElements = {
    // buttons
    addSpouseBtn: 'text=+ Add Spouse',
    addDependentBtn: 'text=+ Add Dependent',
    seeQuotesBtn: 'text=See Quotes',

    // input fields
    annualIncome: 'id=annualIncome',
    householdMembers: 'id=totalHouseholdMembers',
    email: 'id=email',
    phoneNumber: 'id=phoneNumber',

    // select fields
    genderSelection: {
      female: 'li[data-value=Female]',
      male: 'li[data-value=Male]',
    },
    isParent: {
      noOption: 'id=parent1',
      yesOption: 'id=parent0',
    },

    // modals
    goodNewsModal: '//div[@role="dialog"]',

    // primary applicant section
    primary: {
      firstName:
        'div[aria-label="Primary Applicant "] label:has-text("First Name")',
      lastName:
        'div[aria-label="Primary Applicant "] label:has-text("Last Name")',
      dob: 'div[aria-label="Primary Applicant "] label:has-text("Date of Birth*")',
      genderDropdown:
        'div[aria-label="Primary Applicant "] div[aria-label="Sex*"]',
      isTobaccoUser: {
        noOption: '(//input[@id="tobacco1"])[1]',
        yesOption: '(//input[@id="tobacco0"])[1]',
      },
    },

    // spouse applicant section
    spouse: {
      firstName: 'div[aria-label="Spouse "] label:has-text("First Name")',
      lastName: 'div[aria-label="Spouse "] label:has-text("Last Name")',
      dob: 'div[aria-label="Spouse "] label:has-text("Date of Birth")',
      genderDropdown: 'div[aria-label="Spouse "] div[aria-label="Sex*"]',
      isTobaccoUser: {
        noOption: '(//input[@id="tobacco1"])[2]',
        yesOption: '(//input[@id="tobacco0"])[2]',
      },
    },

    // dependent applicant section
    dependent1: {
      firstName: 'div[aria-label="Dependent "] label:has-text("First Name")',
      lastName: 'div[aria-label="Dependent "] label:has-text("Last Name")',
      dob: 'div[aria-label="Dependent "] label:has-text("Date of Birth")',
      genderDropdown: 'div[aria-label="Dependent "] div[aria-label="Sex*"]',
    },
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillPhoneNumberField(phoneNumber: string): Promise<void> {
    await this.page.fill(
      this.demographicsPageElements.phoneNumber,
      phoneNumber
    );
  }

  async fillEmailField(email: string): Promise<void> {
    await this.page.fill(this.demographicsPageElements.email, email);
  }

  async fillFirstNameField(
    firstName: string,
    applicant: ApplicantType = ApplicantType.Primary
  ): Promise<void> {
    let field;
    switch (applicant) {
      case ApplicantType.Primary:
        field = this.demographicsPageElements.primary.firstName;
        break;
      case ApplicantType.Spouse:
        field = this.demographicsPageElements.spouse.firstName;
        break;
      case ApplicantType.Dependent1:
        field = this.demographicsPageElements.dependent1.firstName;
        break;
      default:
        throw new Error(`Invalid applicant type: ${applicant}`);
    }
    await this.page.fill(field, firstName);
  }

  async fillLastNameField(
    lastName: string,
    applicant: ApplicantType = ApplicantType.Primary
  ): Promise<void> {
    let field;
    switch (applicant) {
      case ApplicantType.Primary:
        field = this.demographicsPageElements.primary.lastName;
        break;
      case ApplicantType.Spouse:
        field = this.demographicsPageElements.spouse.lastName;
        break;
      case ApplicantType.Dependent1:
        field = this.demographicsPageElements.dependent1.lastName;
        break;
      default:
        throw new Error(`Invalid applicant type: ${applicant}`);
    }
    await this.page.fill(field, lastName);
  }

  async fillDateOfBirthField(
    dob: string,
    applicant: ApplicantType = ApplicantType.Primary
  ): Promise<void> {
    const isValid = isValidDateOfBirthFormat(dob);
    if (!isValid) {
      throw new Error(
        'Incorrect date format. Please fill date in the format "MM/DD/YYYY".'
      );
    }

    let field;
    switch (applicant) {
      case ApplicantType.Primary:
        field = this.demographicsPageElements.primary.dob;
        break;
      case ApplicantType.Spouse:
        field = this.demographicsPageElements.spouse.dob;
        break;
      case ApplicantType.Dependent1:
        field = this.demographicsPageElements.dependent1.dob;
        break;
      default:
        throw new Error(`Invalid applicant type: ${applicant}`);
    }
    await this.page.fill(field, dob);
  }

  async fillAnnualIncome(annualIncome: number): Promise<void> {
    await this.page.fill(
      this.demographicsPageElements.annualIncome,
      annualIncome.toString()
    );
  }

  async selectGender(
    gender: Gender,
    applicant: ApplicantType = ApplicantType.Primary
  ): Promise<void> {
    let genderOption;
    switch (applicant) {
      case ApplicantType.Primary:
        genderOption =
          gender === Gender.Female
            ? this.demographicsPageElements.genderSelection.female
            : this.demographicsPageElements.genderSelection.male;
        break;
      case ApplicantType.Spouse:
        genderOption =
          gender === Gender.Female
            ? this.demographicsPageElements.genderSelection.female
            : this.demographicsPageElements.genderSelection.male;
        break;
      case ApplicantType.Dependent1:
        genderOption =
          gender === Gender.Female
            ? this.demographicsPageElements.genderSelection.female
            : this.demographicsPageElements.genderSelection.male;
        break;
      default:
        throw new Error(`Invalid applicant type: ${applicant}`);
    }

    await this.page
      .locator(this.demographicsPageElements[applicant].genderDropdown)
      .click();
    await this.page.locator(genderOption).click();
  }

  async selectTobaccoUsageAnswer(
    answer: YesNoAnswer,
    applicant: ApplicantType = ApplicantType.Primary
  ): Promise<void> {
    let tobaccoOption;
    switch (applicant) {
      case ApplicantType.Primary:
        tobaccoOption =
          answer === YesNoAnswer.Yes
            ? this.demographicsPageElements.primary.isTobaccoUser.yesOption
            : this.demographicsPageElements.primary.isTobaccoUser.noOption;
        break;
      case ApplicantType.Spouse:
        tobaccoOption =
          answer === YesNoAnswer.Yes
            ? this.demographicsPageElements.spouse.isTobaccoUser.yesOption
            : this.demographicsPageElements.spouse.isTobaccoUser.noOption;
        break;
      default:
        throw new Error(`Invalid applicant type: ${applicant}`);
    }

    await this.page.click(tobaccoOption);
  }

  async setParentStatus(status: YesNoAnswer): Promise<void> {
    const selector =
      status === YesNoAnswer.Yes
        ? this.demographicsPageElements.isParent.yesOption
        : this.demographicsPageElements.isParent.noOption;

    await this.page.click(selector);
  }

  async clickAddSpouseBtn(): Promise<void> {
    await this.page.click(this.demographicsPageElements.addSpouseBtn);
  }

  async clickAddDependentBtn(): Promise<void> {
    await this.page.click(this.demographicsPageElements.addDependentBtn);
  }

  async clickSeeQuotesBtn(): Promise<void> {
    await this.page.click(this.demographicsPageElements.seeQuotesBtn);
  }

  async waitForGoodNewsModal(): Promise<void> {
    await this.page.waitForSelector(
      this.demographicsPageElements.goodNewsModal
    );
  }

  async fillHouseholdMembers(householdMembers: number): Promise<void> {
    await this.page.fill(
      this.demographicsPageElements.householdMembers,
      householdMembers.toString()
    );
  }

  async fillDemographicsInfo(
    applicant: ApplicantType = ApplicantType.Primary,
    {
      firstName,
      lastName,
      dob,
      gender,
      annualIncome,
      isParent,
      isTobaccoUser,
      householdMembers,
      email,
      phoneNumber,
    }: DemographicsInfo
  ): Promise<void> {
    firstName && (await this.fillFirstNameField(firstName, applicant));
    lastName && (await this.fillLastNameField(lastName, applicant));
    dob && (await this.fillDateOfBirthField(dob, applicant));
    gender && (await this.selectGender(gender, applicant));
    annualIncome && (await this.fillAnnualIncome(annualIncome));
    isParent && (await this.setParentStatus(isParent));
    isTobaccoUser &&
      (await this.selectTobaccoUsageAnswer(isTobaccoUser, applicant));
    householdMembers && (await this.fillHouseholdMembers(householdMembers));
    email && (await this.fillEmailField(email));
    phoneNumber && (await this.fillPhoneNumberField(phoneNumber));
  }
}
