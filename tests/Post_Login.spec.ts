import { test, expect } from '@playwright/test';

test('are you logged in?', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Log out' }).first()).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).first().click();
})


