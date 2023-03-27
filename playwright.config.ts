import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

require('dotenv').config();

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
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
    // any set up tests will be matched from here
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    // subsequent tests that are dependent on set up tests
    {
      name: 'dependent on setup',
      testMatch: '**/*Post_Login.spec.ts',
      dependencies: ['setup'],
      // storageState to pass to these tests from setup test
      use: {
        storageState: STORAGE_STATE,
      },
    },
    //  tests that dont require test setup as a dependency
    {
      name: 'non-set up dependent tests',
      testIgnore: ['**/*loggedin.spec.ts', '**/*.setup.ts'],
    },
  ],
});
