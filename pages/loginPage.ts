import { expect, Page, Locator } from "@playwright/test";
export class LoginPage {
  page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly checkbox: Locator;
  readonly signIn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator("#username");
    this.password = page.locator("#password");
    this.checkbox = page.locator("#terms");
    this.signIn = page.locator("#signInBtn");
  }
  async navigate(url: string) {
    await this.page.goto(url);
  }
  async loginMethod(un: string, pwd: string) {
    await this.userName.fill(un); //"rahulshettyacademy"
    await this.password.fill(pwd); //"Learning@830$3mK2"
    await this.checkbox.check();
    await this.signIn.click();
  }
  async assertPage(Result: string) {
    if (Result === "Pass") {
      await this.page.waitForURL(
        "https://rahulshettyacademy.com/angularpractice/shop",
      );
      await expect(this.page).toHaveURL(
        "https://rahulshettyacademy.com/angularpractice/shop",
      );
    } else {
      await expect(this.page).toHaveURL(
        "https://rahulshettyacademy.com/loginpagePractise/",
      );
    }
  }
}
