import { test } from "@playwright/test";
import { AddNewEmployee, LoginTest, SearchEmployee } from "../fixtures";
import { config } from "../config";

test("search employee details", async ({ page }) => {
  test.setTimeout(3 * 60 * 1000);
  const loginTest = new LoginTest(page);
  const addEmployee = new AddNewEmployee(page);
  const searchEmployee = new SearchEmployee(page);
  await test.step("login into the application", async () => {
    await loginTest.launchUrl(config.TEST_URL);
    await loginTest.loginIn(config.USERNAME, config.PASSWORD);
  });

  await test.step("add employee details", async () => {
    await addEmployee.navigateToEmployeePage();
    await addEmployee.addEmployeeData("Madeshwaran", "R V");
  });

  await test.step("assert employee details", async () => {
    await addEmployee.navigateToEmployeePage();
    await searchEmployee.assertEmployeeDetails("Madeshwaran");
  });
});
