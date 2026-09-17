import { test, expect, Locator } from "@playwright/test";

test("xpath locators", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveTitle("Automation Testing Practice");
  // hard assertion ---> A.R E.R didnt match -> will stop the execution immediately at the same line
  // soft assertion ---> A.R E.R didnt match -> will not stop the execution immediately,
  // remaining execution will happen , at the last it will fail the test

  //   xapth using conatins text()

  // //tagName[conatins(text(),"partial visible Text")]
  const value = await page
    .locator("//span[contains(text(),'For Selenium, Cypress')]")
    .isVisible();
  console.log(value);
  await expect(
    page.locator("//span[contains(text(),'For Selenium, Cypress')]"),
  ).toBeVisible();

  const userNmae: Locator = page.locator('//input[@id="name"]');
  console.log(await userNmae.isEnabled());
  console.log(await userNmae.isEditable());
  console.log(await userNmae.isDisabled());
  console.log(await userNmae.isHidden());

  await expect(userNmae).toBeEnabled();
  await expect(userNmae).toBeEditable();
  await expect(userNmae).not.toBeDisabled();
  await expect(userNmae).not.toBeHidden();
});

test("userfacing locator", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  /*  page.getByAltText;
    page.getByLabel;---first
    page.getByPlaceholder;
    page.getByRole;---- high
    page.getByTestId;
    page.getByText;
    page.getByTitle; */

  // palceholder
  await page.getByPlaceholder("Enter Name").fill("priya");
  await page.getByPlaceholder("Enter EMail").fill("priya@gmail.com");
  await page.getByPlaceholder("Enter Phone").fill("1234567890");

  await page.getByLabel("Address:").fill("AnnaNagar");
  await page.waitForTimeout(3000);
});

test("userfacing  remaining locators", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );

  // getByTitle() -- title attribute's value . not take title tagname

  const text: string = await page.getByTitle("Home page link").innerText();
  await expect(text).toBe("Home");
  const text2 = await page
    .getByTitle("HyperText Markup Language")
    .textContent();
  console.log(text2);
  // getByText() --visible text

  console.log(
    await page
      .getByText(
        "Double click on button, the text from Field1 will be copied into Field2.",
      )
      .textContent(),
  );
  await page.getByText("Copy Text").scrollIntoViewIfNeeded();
  await page.getByText("Copy Text").click();
  await page.getByText("Search", { exact: true }).dblclick();
  await page.waitForTimeout(3000);

  // getByAltText()--->image <img alt="value">  -->logo pic

  const bv = await page.getByAltText("logo image").isVisible();
  // await expect(page).toHaveTitle()
  console.log(bv);
  await expect(page.getByAltText("logo image")).toBeVisible(); //high
  expect(bv).toBeTruthy(); //truthy -true,"  ","dfrtty",526, arr,obj and falsy -false, 0, '', null, undefined or NaN

  // getByTestId --testID's value

  await page.getByTestId("edit-profile-btn").click();
});

test("userfacing  ROLE locators", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );

  await page.getByRole("button", { name: "Primary Action" }).click();
  await page.getByRole("button", { name: "Toggle Button" }).click();
  await page.getByRole("button", { name: "START" }).click();
  await page.getByRole("textbox", { name: "Username:" }).fill("playwright");
  await expect(page.getByRole("textbox", { name: "Username:" })).toHaveValue(
    "playwright",
  );
  //check()
  await page.getByRole("checkbox", { name: "Accept terms" }).check();
  //assetion fro checkbox that have checked
  await expect(
    page.getByRole("checkbox", { name: "Accept terms" }),
  ).toBeChecked();
  //to uncheck
  await page.getByRole("checkbox", { name: "Accept terms" }).uncheck();
  // assetion for checkbox that is not checked
  await expect(
    page.getByRole("checkbox", { name: "Accept terms" }),
  ).not.toBeChecked();
  await page.waitForTimeout(2000);

  // await page.getByRole("radio", { name: "Male", exact: true }).check();
  const innervalue = await page
    .locator("#role-locators")
    .getByRole("link", { name: "Home" })
    .innerText();
  console.log(innervalue);
  console.log(await page.getByRole("alert").textContent());
});


