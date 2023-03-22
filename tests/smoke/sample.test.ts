import { test } from '@playwright/test';
import {
  clickConsentToCookiesButton,
  waitForPageToLoad,
} from '@utils/PageHelpers';
import { getDateOfBirthFromAge } from '@utils/utils';
import { navigateToCensusPage } from '@pages/choice-dtc/CensusPage';

import CensusPage from '@pages/choice-dtc/CensusPage';
import DemographicsPage from '@pages/choice-dtc/DemographicsPage';

import { ApplicantType, Gender, YesNoAnswer } from '@enums/enums';
import applicantInfo from '@data/applicant-information.json';

test('STM - Basic flow 1 @forms @example @smoke', async ({ page }) => {
  const censusPage = new CensusPage(page);
  const demographicsPage = new DemographicsPage(page);

  const zipCode = '75221';
  const dateOfBirth = await getDateOfBirthFromAge(applicantInfo.primary.age);

  await navigateToCensusPage(page);
  await clickConsentToCookiesButton(page);

  await censusPage.fillZipCodeField(zipCode);
  await censusPage.clickOnSTMCheckBox();
  await censusPage.clickOnLetsGoButton();

  await waitForPageToLoad(page, 'Contact Information');
  await demographicsPage.fillDemographicsInfo(ApplicantType.Primary, {
    dob: dateOfBirth,
    gender: Gender.Female,
    isParent: YesNoAnswer.No,
    isTobaccoUser: YesNoAnswer.No,
  });

  // spouse
  await demographicsPage.clickAddSpouseBtn();
  await demographicsPage.fillDemographicsInfo(ApplicantType.Spouse, {
    firstName: applicantInfo.spouse.firstName,
    lastName: applicantInfo.spouse.lastName,
    dob: dateOfBirth,
    gender: Gender.Male,
    isTobaccoUser: YesNoAnswer.No,
  });

  // dependent
  await demographicsPage.clickAddDependentBtn();
  await demographicsPage.fillDemographicsInfo(ApplicantType.Dependent1, {
    firstName: applicantInfo.dependent1.firstName,
    lastName: applicantInfo.dependent1.lastName,
    dob: dateOfBirth,
    gender: Gender.Male,
  });
});
