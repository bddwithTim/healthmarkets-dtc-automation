import { test, expect } from '@playwright/test';
import { Gender } from '@enums/enums';
import {
  getDateOfBirthFromAge,
  parseGender,
  isValidDateOfBirthFormat,
} from '@utils/utils';

test.describe('getDateOfBirthFromAge', () => {
  test('returns a valid date string given an age in years', async () => {
    const dob = await getDateOfBirthFromAge(30);
    expect(isValidDateOfBirthFormat(dob)).toBe(true);
  });

  test('throws an error if given an invalid age', async () => {
    await expect(getDateOfBirthFromAge(-1)).rejects.toThrow('Invalid age');
  });
});

test.describe('parseGender', () => {
  test('correctly identifies gender from a string', () => {
    const male = parseGender('MALE');
    expect(male).toBe(Gender.Male);

    const female = parseGender('Female');
    expect(female).toBe(Gender.Female);
  });

  test('returns "Male" by default if given an invalid gender string', () => {
    const gender = parseGender('invalid gender');
    expect(gender).toBe(Gender.Male);
  });
});

test.describe('isValidDateOfBirthFormat', () => {
  test('returns true if the input is a valid date in the format "MM/DD/YYYY"', () => {
    const validDate = '12/31/1990';
    const result = isValidDateOfBirthFormat(validDate);
    expect(result).toBe(true);
  });

  test('returns false if the input is not a valid date in the format "MM/DD/YYYY"', () => {
    const invalidDate = '31/12/1990';
    const result = isValidDateOfBirthFormat(invalidDate);
    expect(result).toBe(false);
  });
});
