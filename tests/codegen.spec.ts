import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.getByRole("textbox", { name: "Enter Name" }).click();
  await page.getByRole("textbox", { name: "Enter Name" }).fill("priya");
  await page.getByRole("textbox", { name: "Enter EMail" }).click();
  await page
    .getByRole("textbox", { name: "Enter EMail" })
    .fill("priya@gmail.com");
  await expect(
    page.getByRole("textbox", { name: "Enter Phone" }),
  ).toBeVisible();
  await page.locator("html").click();
  await expect(page.locator("h1")).toContainText("Automation Testing Practice");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Simple Alert" }).click();
  await page.getByRole("radio", { name: "Female" }).check();
  await page.getByRole("checkbox", { name: "Monday" }).check();
  await page.getByLabel("Country:").selectOption("japan");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "New Tab" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("textbox", { name: "search" }).click();
  await page1.getByRole("textbox", { name: "search" }).fill("playwright");
  await page1.getByRole("button", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Address:" }).click();
  await page.getByRole("textbox", { name: "Address:" }).fill("annanagar");
  await page.getByRole("button", { name: "Point Me" }).click();
  await page.getByRole("link", { name: "Mobiles" }).click();
  await page1.getByRole("link", { name: "Websites for Automation" }).click();
});
