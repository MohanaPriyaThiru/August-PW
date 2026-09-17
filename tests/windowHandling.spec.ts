import { test, expect } from "@playwright/test";

test("Window handling", async ({ page, context }) => {
  await page.goto("https://www.amazon.in/");

  await page.getByLabel("Search Amazon.in").fill("iphone");
  await page.getByLabel("Search Amazon.in").press("Enter");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByLabel(/iPhone 17 Pro Max 256 GB: 17.42 cm/).click(),
  ]);

  //   page.waitForEvent("popup")
  //   context.waitForEvent("page")

  await newPage.waitForLoadState();
  console.log(`${page.url()}    ${await page.title()}`);
  console.log(`            `);
  console.log(`${newPage.url()}    ${await newPage.title()}`);

  const amount = await newPage
    .locator(
      '//div[@class="a-section apex-core-price-identifier"]//span[text()="1,44,900" and @class="a-price-whole"]',
    )
    .innerText();
  console.log(amount);

  await page.bringToFront();
  await page.locator('//a[text()="Mobiles"]').click();
  await newPage.bringToFront();
  await page.waitForTimeout(3000);
  
});




