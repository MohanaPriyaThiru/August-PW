// DropDown
// 1. select tag
// 2. Non select tag
// 3.dynamic dropdown or autosuggestion

import { test, expect } from "@playwright/test";

test("Select tag DropDown", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  //   tagName only <select>  ----> selectOption()
  // 3 ways 1. value,2. label/visibleText, 3. index

  const amazondd = await page.getByTitle("Search in");

  await expect(amazondd).toBeEnabled();
  const ddoptionCount = await page
    .locator("select#searchDropdownBox option")
    .count();

  expect(ddoptionCount).toBe(46);
  console.log(ddoptionCount);
  console.log("====initial=====");
  console.log(
    await page.locator("#searchDropdownBox option:checked").innerText(),
  );

  //   selct by value
  await amazondd.selectOption({ value: "" });
  //   await page.waitForTimeout(2000);
  console.log("=========alexa=====");
  console.log(
    await page.locator("#searchDropdownBox option:checked").innerText(),
  );

  // selct by label
  await amazondd.selectOption({ label: "Audible Audiobooks" });
  //   await page.waitForTimeout(2000);
  console.log("============audio===========");
  console.log(
    await page.locator("#searchDropdownBox option:checked").innerText(),
  );
  //  selct by index
  await amazondd.selectOption({ index: 4 }); //amazon fresh
  await expect(amazondd).toHaveValue("search-alias=nowstore");
  await page.waitForTimeout(2000);

  const allOptionNames = await page
    .locator("select#searchDropdownBox option")
    .allInnerTexts();
  console.log(allOptionNames);

  const selctedOption = await page
    .locator("#searchDropdownBox option:checked")
    .innerText();

  console.log(selctedOption);

  console.log("---------not selected list -----------------");

  const notselctedOptions = await page
    .locator("#searchDropdownBox option:not(:checked)")
    .allTextContents();

  console.log(notselctedOptions);
});

test("multi select", async ({ page }) => {
  await page.goto("https://letcode.in/dropdowns");
  // value attribute's value
  await page.getByRole("listbox").selectOption(["bp", "cm", "gr"]);
  await page.locator("#superheros").selectOption(["bp", "gr"]);
  // label - visible text
  await page
    .locator("#superheros")
    .selectOption([{ label: "Aquaman" }, { label: "Doctor Strange" }]);
  await page.waitForTimeout(3000);
  await page.locator("#superheros").selectOption([]);
  await page.waitForTimeout(3000);
});

test("RA select", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // value attribute's value
  await page
    .locator("#dropdown-class-example")
    .selectOption({ value: "option2" });
  await page.waitForTimeout(2000);
  await page.locator("#dropdown-class-example").selectOption({ value: "" });
  await page.waitForTimeout(2000);
});

test("non selct dd", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // value attribute's value
  await page
    .getByPlaceholder("Type to Select Countries")
    .pressSequentially("IND");
  // await page
  //   .locator('//li[@class="ui-menu-item"]/child::div[text()="India"]')
  //   .click();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // await page.press('//li[@class="ui-menu-item"]/child::div[text()="India"]','Enter')
  await page.waitForTimeout(2000);
});

test("Google", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.getByRole("combobox").pressSequentially("Ind");
  await page
    .locator('ul[role="listbox"] li[role="presentation"]')
    .first()
    .waitFor();
  const autoCount = await page
    .locator('ul[role="listbox"] li[role="presentation"]')
    .count();

  console.log(autoCount);

  const allTheList = await page
    .locator('ul[role="listbox"] li[role="presentation"]')
    .allInnerTexts();
  console.log(allTheList);

  // await page
  //   .locator('ul[role="listbox"] li[role="presentation"]:nth-child(3)')
  //   .click();
  await page.waitForTimeout(2000);
  for (let c of allTheList) {
    if (c.includes("afghanistan national cricket team match scorecard")) {
      await page
        .getByLabel(
          "india national cricket team vs afghanistan national cricket team match scorecard",
        )
        .click();
      break;
    }
  }
  const selected = await page.getByRole("combobox").inputValue();

  await expect(selected).toContain("india");
});
