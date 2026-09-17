import { test } from "@playwright/test";

test("all methods", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //   await page.reload();
  //   await page.goBack();
  //   await page.goForward();
  //   await page.setViewportSize({ width: 1920, height: 1080 });
  await page.getByPlaceholder("Enter Name").fill("priya");
  const value = await page.getByPlaceholder("Enter Name").inputValue();
  console.log(value);
  await page.getByRole("button", { name: "Point Me" }).hover();
  await page.dragAndDrop("#draggable", "#droppable");
  await page.waitForTimeout(2000);
  //   playwright defaut view port size width:1280,Height:720
});
