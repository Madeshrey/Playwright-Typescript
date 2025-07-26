import { Locator, Page } from "@playwright/test";
import { homePageLocators } from "../input/locators";
import { softExpect } from "./loginTest";
import { CommonFunctions } from "./commonFunctions";
import { userDetails } from "../input/data/userData";
import { alerts } from "../input/data/alertMessage";
export class AddNewEmployee {
  private page: Page;
  private commonFunctions: CommonFunctions;
  public readonly pimButton: Locator;
  public readonly addEmployeeTab: Locator;
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly createLoginCheckbox: Locator;
  public readonly addUserName: Locator;
  public readonly addPassword: Locator;
  public readonly confirmPassword: Locator;
  public readonly saveButton: Locator;
  public readonly snackBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonFunctions = new CommonFunctions(this.page);
    this.pimButton = this.page.getByRole("link", {
      name: homePageLocators.pim,
    });
    this.addEmployeeTab = this.page.getByRole("link", {
      name: homePageLocators.addEmployee,
    });
    this.firstName = this.page.getByRole("textbox", {
      name: homePageLocators.firstName,
    });
    this.lastName = this.page.getByRole("textbox", {
      name: homePageLocators.lastName,
    });
    this.createLoginCheckbox = this.page.locator(homePageLocators.createLogin);
    this.addUserName = this.page.locator(homePageLocators.appUserName).nth(2);
    this.addPassword = this.page.locator(homePageLocators.appPassword).first();
    this.confirmPassword = this.page
      .locator(homePageLocators.appPassword)
      .nth(1);
    this.saveButton = this.page.getByRole("button", {
      name: homePageLocators.saveButton,
    });
    this.snackBar = this.page.getByText(alerts.successfullySaved);
  }

  async navigateToEmployeePage() {
    await this.pimButton.click();
    softExpect(this.page.url()).toContain("pim/viewEmployeeList");
  }

  async addEmployeeData(input1: string, input2: string) {
    await this.addEmployeeTab.click();
    await this.commonFunctions.assertElementVisibility([
      this.firstName,
      this.lastName,
      this.createLoginCheckbox,
    ]);
    await this.firstName.fill(input1);
    await this.lastName.fill(input2);
    await this.saveButton.click();
    await softExpect(this.snackBar).toBeVisible({timeout:120000});
  }

  async fillUserData() {
    await this.createLoginCheckbox.click();
    await this.commonFunctions.fillTextFields(
      [this.addUserName, this.addPassword, this.confirmPassword],
      [
        userDetails.appUserName,
        userDetails.appPassword,
        userDetails.appPassword,
      ]
    );
    await this.saveButton.click();
  }
}
