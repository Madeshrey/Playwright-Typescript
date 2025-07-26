import { CommonFunctions, LoginTest } from "../fixtures/index";
import { config } from "../config";
import { test } from "@playwright/test";
import { alerts } from "../input/data/alertMessage";

let loginTest: LoginTest;
let commonFunctions: CommonFunctions;
test.describe.parallel("login test", () => {
  test.beforeEach("launch url", async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    loginTest = new LoginTest(page);
    commonFunctions = new CommonFunctions(page);
    await loginTest.launchUrl(config.TEST_URL);
  });
  test("login with valid credentials", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn(config.USERNAME, config.PASSWORD);
  });

  test("login with invalid credentials", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn("abcd", "jhsjs");
  });

  test("login with wrong username", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn("adbc", config.PASSWORD);
    await commonFunctions.verifySnackBarMessage(alerts.invalidCredentials);
  });

  test("login with wrong user", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn(config.USERNAME, "abssj");
    await commonFunctions.verifySnackBarMessage(alerts.invalidCredentials);
  });

  test("login with username empty", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn("", config.PASSWORD);
    await commonFunctions.verifyRequiredErrorMessage(loginTest.required);
  });

  test("login with password empty", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn("", config.PASSWORD);
    await commonFunctions.verifyRequiredErrorMessage(loginTest.required);
  });

  test("login with both fields empty", async () => {
    test.setTimeout(2 * 60 * 1000);
    await loginTest.loginIn("", "");
    await commonFunctions.verifyRequiredErrorMessage(loginTest.required);
  });
});
