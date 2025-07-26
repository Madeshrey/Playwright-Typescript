import { config } from "../config";
import { test } from "@playwright/test";
import {
  AddNewEmployee,
  LoginTest,
  SearchEmployee,
} from "../fixtures";

let loginTest: LoginTest;

test("login with valid credentials", async ({ page }) => {
  test.setTimeout(3 * 60 * 1000);
  loginTest = new LoginTest(page);
  const addEmployee = new AddNewEmployee(page);
  const searchEmployee = new SearchEmployee(page);
  await loginTest.launchUrl(config.TEST_URL);
  await loginTest.loginIn(config.USERNAME, config.PASSWORD);

  await test.step("add employee details", async () => {
    await addEmployee.navigateToEmployeePage();
    await addEmployee.addEmployeeData("virat", "kholi");
  });

  await test.step("assert employee details", async () => {
    await addEmployee.navigateToEmployeePage();
    await searchEmployee.assertEmployeeDetails("virat");
  });

  await test.step('logout',async()=>{
    await loginTest.verifyLogout()
  })
});
