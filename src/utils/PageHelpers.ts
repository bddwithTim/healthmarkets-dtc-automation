import { Page } from '@playwright/test';
import { LoadState } from '@enums/enums';

interface VerifyPageOptions {
  loadState?: LoadState;
  timeout?: number;
}

export async function waitForPageToLoad(
  page: Page,
  pageTitle: string,
  { loadState = LoadState.Load, timeout = 30000 }: VerifyPageOptions = {}
): Promise<void> {
  await Promise.all([
    page.waitForFunction(
      (title: string) => document.title.includes(title),
      pageTitle,
      { timeout }
    ),
    page.waitForLoadState(loadState, { timeout }),
  ]);

  if (await hasUHOSpinner(page)) {
    await waitForUHOSpinnerToDisappear(page);
  }
}

export async function clickConsentToCookiesButton(page: Page): Promise<void> {
  await page.click('button:has-text("I consent to cookies")');
}

export async function hasUHOSpinner(page: Page): Promise<boolean> {
  const spinnerSelector = 'div.loader';
  return page.isVisible(spinnerSelector);
}

export async function waitForUHOSpinnerToDisappear(page: Page): Promise<void> {
  const spinnerSelector = 'div.loader';
  await page.waitForSelector(spinnerSelector);

  // Wait for the spinner to disappear
  await page.waitForSelector(spinnerSelector, { state: 'hidden' });
}

export async function clickUHOContinueBtn(page: Page): Promise<void> {
  await page.click('//span[@data-code="MultiCarrier.Buttons.Continue"]');
}

export async function waitForNewTab(page: Page): Promise<Page> {
  const newTab = await page.waitForEvent('popup');
  return newTab;
}
