import { test, expect } from "@playwright/test";

test("webtable handling", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-table/");

  const table = await page.locator("#courses_table");
  const column = await page.locator("#courses_table thead tr th");
  const columnCount = await column.count();
  console.log(columnCount);
  expect(columnCount).toBe(6);

  const row = await page.locator("#courses_table tbody tr");
  const rowCOunt = await row.count();
  console.log(rowCOunt);
  expect(rowCOunt).toBe(9);

  //   column name verification
  expect(page.locator("#col_id")).toHaveText("ID");
  expect(page.locator("#col_course")).toHaveText("Course Name");

  //   single data/ cell extraction
  const singleData = await page
    .locator("#courses_table tbody tr:nth-child(2) td:nth-child(2)")
    .textContent();
  console.log(singleData);

  //   row extraction

  const rowText = await page
    .locator("#courses_table tbody tr:nth-child(4)")
    .textContent();
  console.log(rowText);

  const allData = await page
    .locator("#courses_table tbody tr td")
    .allTextContents();
  console.log(allData);
});

test("dynamic table", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");
  const columnCount = await page.getByRole("columnheader").count();
  console.log(columnCount);
  const column_header = await page.getByRole("columnheader").allInnerTexts();
  console.log(column_header);
  const indexOfCPU = column_header.indexOf("Network");
  const targetRow = page
    .getByRole("row")
    .filter({ hasText: "Internet Explorer" });

  console.log(await targetRow.innerText());

  console.log(await targetRow.getByRole("cell").nth(indexOfCPU).innerText());
});
