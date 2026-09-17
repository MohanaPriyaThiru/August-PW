import {
  test,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
// Inbuild Fixtures - (browser, context, page,)--> UI ,request-->API

// broswer  --> context --> page
test("test case name", async () => {
  const browser: Browser = await chromium.launch(); //-->browser
  const context: BrowserContext = await browser.newContext(); //-->context
  const page: Page = await context.newPage(); //-->page
  await page.waitForTimeout(3000);
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.waitForTimeout(2000);
});

// Commands to ru n the test
// npx playwright test
// to run specific file : npx playwright test filename
// npx plsywright test day1.spec.ts

test("testcase2", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // CSS, Xpath, UserFacingLoctors/inbuild methods
  // CSS selectors
  // ID attribute --> #IDVALUE
  await page.locator("#name").fill("mohanapriya");
  await page.locator("#email").fill("priya@gmail.com");

  // Class attribute-->.classvalue
  await page.locator(".form-control").nth(2).fill("1528693545");

  // Attribute name and  value
  await page.locator('[id="textarea"]').fill("Anna nagar");
  // await page.locator('[value="male"]').check(); //radio button and check box
  await page.locator('[name="gender"]').nth(1).check();
  await page.waitForTimeout(3000);
});
