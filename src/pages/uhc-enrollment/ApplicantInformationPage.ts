import { Page } from '@playwright/test';

export type Height = {
  feet: number;
  inches: number;
};

export type Weight = {
  lbs: number;
};

export type PrimaryApplicantInfo = {
  firstName?: string;
  lastName?: string;
  height?: Height;
  weight?: Weight;
  emailAddress?: string;
  gender?: string;
  phoneNumber?: string;
  ssn?: number;
};

export default class UHOApplicantInfoPage {
  private readonly page: Page;

  private applicantInformationPageElements = {
    // radio buttons
    rdoBtnMale: '//label[@for="primary_gender_0"]',
    rdoBtnFemale: '//label[@for="primary_gender_1"]',

    // input fields
    primaryFirstName: 'id=primary_firstName',
    primaryLastName: 'id=primary_lastName',
    primaryDateOfBirth: 'id=primary_birthDate',
    primaryHeightFeet: 'id=primary_height_feet',
    primaryHeightInch: 'id=primary_height_inch',
    primaryWeight: 'id=primary_weight',
    primaryEmailAddress: 'id=primary_emailAddress',
    primaryPhone: 'id=primary_phone',
    primarySSN: 'id=primary_SSN',

    contactInfoAddress1: 'id=contactInfo_addressLine1',
    contactInfoCity: 'id=contactInfo_city',
  };

  constructor(page: Page) {
    this.page = page;
  }

  async fillPrimaryHeightInFeet(heightFeet: number | string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primaryHeightFeet,
      heightFeet.toString()
    );
  }

  async fillPrimaryHeightInInches(heightInch: number | string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primaryHeightInch,
      heightInch.toString()
    );
  }

  async fillPrimaryHeight(height: Height): Promise<void> {
    await this.fillPrimaryHeightInFeet(height.feet);
    await this.fillPrimaryHeightInInches(height.inches);
  }

  async fillPrimaryWeight(weight: number | string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primaryWeight,
      weight.toString()
    );
  }

  async fillPrimaryEmailAddress(emailAddress: string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primaryEmailAddress,
      emailAddress
    );
  }

  async fillPrimaryPhone(phone: string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primaryPhone,
      phone
    );
  }

  async fillPrimarySSN(ssn: number): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.primarySSN,
      ssn.toString()
    );
  }

  async fillResidentPhysicalAddress(address: string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.contactInfoAddress1,
      address
    );
  }

  async fillResidentCity(city: string): Promise<void> {
    await this.page.fill(
      this.applicantInformationPageElements.contactInfoCity,
      city
    );
  }

  async fillPrimaryApplicantInfo({
    firstName,
    lastName,
    height,
    weight,
    emailAddress,
    phoneNumber,
    ssn,
    gender,
  }: PrimaryApplicantInfo): Promise<void> {
    firstName &&
      (await this.page.fill(
        this.applicantInformationPageElements.primaryFirstName,
        firstName
      ));
    lastName &&
      (await this.page.fill(
        this.applicantInformationPageElements.primaryLastName,
        lastName
      ));

    height?.feet &&
      height?.inches &&
      (await this.fillPrimaryHeight({
        feet: height.feet,
        inches: height.inches,
      }));
    weight?.lbs && (await this.fillPrimaryWeight(weight.lbs));

    emailAddress && (await this.fillPrimaryEmailAddress(emailAddress));
    phoneNumber && (await this.fillPrimaryPhone(phoneNumber));
    ssn && (await this.fillPrimarySSN(ssn));

    gender?.toLowerCase() === 'male'
      ? await this.page.click(this.applicantInformationPageElements.rdoBtnMale)
      : gender?.toLowerCase() === 'female' &&
        (await this.page.click(
          this.applicantInformationPageElements.rdoBtnFemale
        ));
  }
}
