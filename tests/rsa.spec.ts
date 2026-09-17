// import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import data from "../testData/data.json";
// import datas from "../testData/datadriven.json";
import { reader } from "../utility/excelReader";

import { test } from "../fixture/loginfixture";

test("Login Page", async ({ page }) => {
  let loginobj = new LoginPage(page);
  await loginobj.navigate(data.url);
  await loginobj.loginMethod(data.un, data.pwd);
  // await loginobj.assertPage(data);
});

test("homepage", async ({ loginFixture }) => {
  const obj = new HomePage(loginFixture);
  /* let loginobj = new LoginPage(page);

  await loginobj.navigate(data.url);
  await loginobj.loginMethod(data.un, data.pwd); */
  await obj.homePage();
});

// data driven testing -- passing multiple set of test data in one test case
// login  positive, negative- un pwd, empty ,special, phone,email
/* for (let a = 0; a < datas.length; a++) {
  test(`data driven testing ${datas[a].un} and ${datas[a].pwd}`, async ({
    page,
  }) => {
    let loginobj = new LoginPage(page);
    await loginobj.navigate(data.url);
    await loginobj.loginMethod(datas[a].un, datas[a].pwd);
    await loginobj.assertPage();
  });
} */

const datas = reader();

for (let d of datas) {
  test(`data driven testing ${d.UserName} and ${d.Password}`, async ({
    page,
  }) => {
    let loginobj = new LoginPage(page);
    await loginobj.navigate(data.url);
    await loginobj.loginMethod(d.UserName, d.Password);
    await loginobj.assertPage(d.Result);
  });
}
