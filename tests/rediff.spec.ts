import { test, expect } from "@playwright/test";

test("rediff user regis", async ({ page }) => {
  await page.goto(
    "https://register.rediff.com/register/register.php?FormName=user_details",
  );

  await page.locator('[placeholder="Enter your full name"]').fill("priya");
  //Contains method
  await page.locator('//input[contains(@id,"login")]').fill("priya@gmail.com");
  await page.locator('[type="radio"]').nth(1).check();
  await page
    .locator('//input[@placeholder="Enter password"]')
    .type("gthy67888", { delay: 300 });

  await page.waitForTimeout(4000);
  //Basic xpath
  await page
    .locator('//input[@placeholder="Enter password"]')
    .pressSequentially("gthy67888", { delay: 300 });
  await page.waitForTimeout(3000);
});

// XPATH
// 2 type- Absolute xapth--long, //root of the HTML //weak , easily breakable , Single forward slash
// relative xpath// current node, short, will not easily break, it starts with double forward slash
// difference Absolute xpath and relative xapth
// fill() --> will clear the exsisting value and pass the value in one shot vs
// type()--> will not clear the exsisting value , join with that value , will type one by one char
// pressSequetially()-->will type one by one char

test("xpath", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // xpath using text
  const gettext = await page
    .locator('//span[text()="For Selenium, Cypress & Playwright"]')
    .textContent();
  console.log(gettext);
  expect(gettext).toBe("For Selenium, Cypress  ");

  // expect--validation or assertion --> actual result expect result match

  
});


