// Alerts --popup
// native alert --> i cant inspect -->Alert, confirm,prompt
// mordern alert --> can inspect--> modal, sweetalert,

import { test, expect } from "@playwright/test";

test("Alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (a) => {
    console.log(a.type()); //which type of alert
    console.log(a.message()); //will return message
    // console.log(a.defaultValue());
    await page.waitForTimeout(3000);

    // a.accept();
    await page.waitForTimeout(2000);

    // a.accept("SpiderMan");
    a.dismiss();
  });

  //   await page.getByRole("button", { name: "Simple Alert" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Confirmation Alert" }).click();
  await page.getByRole("button", { name: "Prompt Alert" }).click();

  //   const text = await page.locator("#demo").innerText();
  //   expect(text).toContain("SpiderMan");
});

test("modern alerts", async ({ page }) => {
  await page.goto("https://sweetalert2.github.io/");
  await page
    .locator(".showcase.sweet button.show-example-btn")
    .click({ force: true });
  console.log(
    await page.getByRole("heading", { name: "Good job!" }).textContent(),
  );
  await page.getByRole("button", { name: "OK" }).click();
});


