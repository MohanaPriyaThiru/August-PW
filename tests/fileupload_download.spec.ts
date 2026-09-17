import { test } from "@playwright/test";

test("File Upload", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator('[type="file"]#singleFileInput').scrollIntoViewIfNeeded();
  await page
    .locator("#singleFileInput")
    .setInputFiles("testData/API TESTING QUESTIONS.pdf");
  await page.waitForTimeout(2000);

  await page.locator("#singleFileInput").setInputFiles([]);
  await page.waitForTimeout(2000);

  await page
    .locator("#multipleFilesInput")
    .setInputFiles([
      "testData/API TESTING QUESTIONS.pdf",
      "testData/utils.xlsx",
    ]);
  await page.waitForTimeout(2000);
});

test("file download", async ({ page }) => {
  await page.goto("https://practice-automation.com/file-download/");
  const [downfile] = await Promise.all([
    page.waitForEvent("download"),
    page.click('//a[text()="Download"][1]'),
  ]);
  const fileName = downfile.suggestedFilename();
  console.log(fileName);
  await downfile.saveAs("testData/playwright download practice");
});
