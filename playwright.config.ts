import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  expect: {
    timeout: 30000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace:"on-first-retry",
  },

  projects: [
    {
      name: "googlechrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        headless: true,
        viewport: process.env.CI ? { width: 1280, height: 720 } : null,
        launchOptions: {
          args: process.env.CI
            ? ['--window-size=1280,720']
            : ['--start-maximized'],
        },
        deviceScaleFactor: undefined,
      },
    },
  ],
});
