import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('perform login', async ({ page }) => {
  await page.goto('https://www.trademe.co.nz/');
  await page.goto('https://www.trademe.co.nz/a/');
  await page.getByText('Register Log in').first().click();
  await page.getByRole('link', { name: 'Log in' }).first().click();
  await page.frameLocator('internal:role=dialog >> iframe').getByLabel('Email').click();
  await page.frameLocator('internal:role=dialog >> iframe').getByLabel('Email').fill(process.env.USERNAME!);
  await page.frameLocator('internal:role=dialog >> iframe').getByLabel('Email').press('Tab');
  await page.frameLocator('internal:role=dialog >> iframe').getByLabel('Password').fill(process.env.PASSWORD!!);
  await page.frameLocator('internal:role=dialog >> iframe').getByLabel('Password').press('Enter');

  await expect(page.getByRole('link', { name: 'Log out' }).first()).toBeVisible();

  await page.context().storageState({path: STORAGE_STATE});
  
});