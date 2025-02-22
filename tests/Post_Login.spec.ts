import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('logs user out', async ({ page }) => {
  await page.getByRole('button', { name: /Personal tools/i }).check();
  await page.getByRole('link', { name:  /Log out/i }).click();
  await expect(page.getByRole('heading', { name: /Log out/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log in', exact: true })).toBeVisible();
})
