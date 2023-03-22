import { Gender } from '@enums/enums';

/**
 * Calculates the date of birth given an age in years.
 * Returns a formatted string in the format "MM/DD/YYYY".
 */
export async function getDateOfBirthFromAge(
  ageInYears: number
): Promise<string> {
  const today = new Date();
  const birthDate = new Date(
    today.getFullYear() - ageInYears,
    today.getMonth(),
    today.getDate()
  );
  const birthDateMonth = birthDate.getMonth() + 1;
  const birthDateDay = birthDate.getDate();
  const birthDateYear = birthDate.getFullYear();
  // format date to MM/DD/YYYY
  return `${birthDateMonth.toString().padStart(2, '0')}/${birthDateDay
    .toString()
    .padStart(2, '0')}/${birthDateYear}`;
}

export function parseGender(gender: string): Gender {
  return gender.toLowerCase() === 'female' ? Gender.Female : Gender.Male;
}

export function isValidDateOfBirthFormat(dob: string): boolean {
  const regex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/g;
  const match = dob.match(regex);
  return Boolean(match);
}
