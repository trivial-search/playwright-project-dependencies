import { test, expect } from '@playwright/test';

/*test.beforeEach(async ({ page }) => {
  await page.goto('https://trademe.co.nz');
});*/

test('user already logged in', async ({ page }) => {
  await page.goto('https://trademe.co.nz');
  await expect(page.getByRole('link', { name: 'Log out' }).first()).toBeVisible();
})

test('log out now', async ({ page }) => {
  await page.getByRole('link', { name: 'Log out' }).first().click();
})

