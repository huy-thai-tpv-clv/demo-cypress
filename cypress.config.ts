import { defineConfig } from 'cypress';

export default defineConfig({
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Auth App Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    // defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    // viewportHeight: 1080,
    // viewportWidth: 1920,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },

    specPattern: 'cypress/component/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
