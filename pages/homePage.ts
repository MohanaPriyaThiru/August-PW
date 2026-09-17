import { expect, Page, Locator } from "@playwright/test";

export class HomePage {
  add: Locator;
  checkout: Locator;
  constructor(page: Page) {
    this.add = page.getByRole("button", { name: "Add " }).first();
    this.checkout = page.getByText(/Checkout/);
  }

  async homePage() {
    await this.add.click();
    await this.checkout.click();
  }
}
