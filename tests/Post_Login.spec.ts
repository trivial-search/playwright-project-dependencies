import { test, expect } from '@playwright/test';

/*test.beforeEach(async ({ page }) => {
  await page.goto('https://trademe.co.nz');
});*/

test('logout if user already logged in', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Log out' }).first()).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).first().click();
})


