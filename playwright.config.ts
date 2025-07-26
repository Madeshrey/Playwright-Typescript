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
    video: "on",
    screenshot: "on",
    trace:"on-first-retry",
  },

  projects: [
    {
      name: "googlechrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: null,
        headless: true,
        launchOptions: {
          args: ["--start-maximized"],
        },
        deviceScaleFactor: undefined,
      },
    },
  ],
});
