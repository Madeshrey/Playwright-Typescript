import { test } from "@playwright/test";
import { AddNewEmployee, LoginTest } from "../fixtures/index";
import { config } from "../config";

test("Add a new Employee", async ({ page }) => {
  test.setTimeout(3 * 60 * 1000);
  const loginTest = new LoginTest(page);
  const addNewEmployee = new AddNewEmployee(page);
  await test.step("login into the application", async () => {
    await loginTest.launchUrl(config.TEST_URL);
    await loginTest.loginIn(config.USERNAME, config.PASSWORD);
  });

  await test.step("navigate to employee page", async () => {
    await addNewEmployee.navigateToEmployeePage();
  });

  await test.step('add employee details',async()=>{
    await addNewEmployee.addEmployeeData('Madeshwaran','R V')
  })
});
