import { Locator, Page, expect } from "@playwright/test";
import { loginLocators } from "../input/locators/index";
import { CommonFunctions } from "./commonFunctions";
export const softExpect = expect.configure({ soft: true, timeout: 30000 });
export class LoginTest {
  private page: Page;
  public readonly username: Locator;
  public readonly password: Locator;
  public readonly login: Locator;
  public readonly forgetPassword: Locator;
  public readonly required: Locator;
  public readonly profileIcon: Locator;
  public readonly logout: Locator;
  constructor(page: Page) {
    this.page = page;
    this.username = this.page.getByRole("textbox", {
      name: loginLocators.username,
    });
    this.password = this.page.getByRole("textbox", {
      name: loginLocators.password,
    });
    this.login = this.page.getByRole("button", { name: loginLocators.login });
    this.forgetPassword = this.page.getByText(loginLocators.forgotPassword);
    this.required = this.page.locator(loginLocators.required);
    this.profileIcon = this.page.locator(loginLocators.profileIcon)
    this.logout = this.page.getByRole("menuitem", {
      name: loginLocators.logout,
    });
  }

  async launchUrl(URL: string) {
    await this.page.goto(URL);
  }

  async loginIn(input1: string, input2: string) {
    const commonFunctions = new CommonFunctions(this.page);
    const elements = [this.username, this.password, this.login];
    await commonFunctions.assertElementVisibility(elements);
    await this.username.fill(input1);
    await this.password.fill(input2);
    await this.login.click();
  }

  async verifyLogout() {
    const commonFunctions = new CommonFunctions(this.page);
    await softExpect(this.profileIcon).toBeVisible();
    await this.profileIcon.click();
    await this.logout.click();
    const elements = [this.username, this.password, this.login];
    await commonFunctions.assertElementVisibility(elements);
  }
}
