import { Locator, Page, expect } from "@playwright/test";
import { softExpect } from "./loginTest";
export class CommonFunctions {
  private page: Page;
  public readonly alert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alert = this.page.getByRole("alert");
  }

  async assertElementVisibility(fieldLocator: Locator[]) {
    for (let val = 0; val < fieldLocator.length; val++) {
      await expect(fieldLocator[val]).toBeVisible();
    }
  }

  async verifySnackBarMessage(message: string) {
    await this.assertElementVisibility([this.alert]);
    await softExpect(this.alert).toHaveText(message);
  }

  async fillTextFields(fieldLocators:Locator[],input:string[]){
    for(let val=0;val<fieldLocators.length;val++){
        await softExpect(fieldLocators[val]).toBeVisible()
        await fieldLocators[val].fill(input[val])
    }
  }

  async verifyRequiredErrorMessage(fieldLocator: Locator) {
    const count = await fieldLocator.count();
    if (count === 1) {
      await softExpect(fieldLocator).toBeVisible();
    } else {
      await softExpect(fieldLocator.first()).toBeVisible();
      await softExpect(fieldLocator.last()).toBeVisible();
    }
  }
}
