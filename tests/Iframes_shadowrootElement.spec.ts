import { test, expect } from "@playwright/test";

// DOM---> application, hide-->security, css - shadow dom -- shadow root-- xpath

// css selectors, inbuild methods
// root (open) -- both

// root (closed) -- none

test("shadow dom", async ({ page }) => {
  await page.goto("https://selectorshub.com/xpath-practice-page/");
  await page.locator("#kils").fill("Rajan");
  await page.getByPlaceholder("Enter pizza name").fill("pizza");

  await page.getByTitle("user password field").fill(`12456398753`);
  await page.waitForTimeout(3000);
});

// Iframes
// Screenshot -->fullPage,Visible screenshot, prticular element
test("Iframes", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  await page
    .frameLocator("#firstFr")
    .getByPlaceholder("Enter name")
    .fill("priya");
  await page.frameLocator("#firstFr").locator('[name="lname"]').fill("thiru");
  // fullpage screenshot
  await page.screenshot({ path: "fullpage.png", fullPage: true });
  // visible page
  await page.screenshot({ path: "screenshot/visiblepage.jpeg" });
  // particular element
   await page.frameLocator("#firstFr").locator('[name="lname"]').screenshot({ path: "screenshot/locator.png"});

  await page
    .frameLocator("#firstFr")
    .frameLocator('[title="Inner Frame"]')
    .locator('[name="email"]')
    .fill("priya@gmail.com");

  await page.waitForTimeout(2000);
});

test("Iframes using index method", async ({ page }) => {
  await page.goto("https://letcode.in/frame");

  const allFrames = await page.frames();
  console.log(allFrames.length);
  allFrames.forEach((f, i) => {
    console.log(`${i} ---> ${f.url()}`);
  });

  await allFrames[1].getByPlaceholder("Enter name").fill("priya");
  await allFrames[1].locator('[name="lname"]').fill("thiru");

  await allFrames[2].locator('[name="email"]').fill("priya@gmail.com");

  await page.waitForTimeout(2000);
});
