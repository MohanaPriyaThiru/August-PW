import { test as a, Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import data from "../testData/data.json";
type log = {
  loginFixture: Page;
};
export const test = a.extend<log>({
  loginFixture: async ({ page }, use) => {
    const logobj = new LoginPage(page);
    await logobj.navigate(data.url);
    await logobj.loginMethod(data.un, data.pwd);
    await logobj.assertPage("Pass");
    use(page);
  },
});
