import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

require('dotenv').config();

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html']],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run tests in files in parallel */
  fullyParallel: true,

  use: {
    baseURL: 'https://trademe.co.nz',
    // run traces on the first retry of a failed test
    trace: 'on-first-retry',
  },

  projects: [
    // any set up tests will be matches from here
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    // subsequent tests that are dependent on set up tests
    {
      name: 'dependent on setup',
      testMatch: '**/*after_login.spec.ts',
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
    // this project runs all tests expect the setup and logged in tests
    {
      name: 'e2e tests',
      testIgnore: ['**/*loggedin.spec.ts', '**/*.setup.ts'],
    },
  ],
});
