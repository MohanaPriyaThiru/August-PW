import { test } from "@playwright/test";
// playwright hooks
test.afterAll(() => {
  console.log("Running after all");
});
test.beforeAll(() => {
  console.log("Running before all");
});
test.afterEach(() => {
  console.log("Running after Each");
});
test.beforeEach(() => {
  console.log("Running before each");
});

test("TEST 1", async ({ page }) => {
  console.log("Running TEST 1");
});
test("TEST 2", async ({ page }) => {
  console.log("Running TEST 2");
});
test("TEST 3", async ({ page }) => {
  console.log("Running TEST 3");
});
test("TEST 4", async ({ page }) => {
  console.log("Running TEST 4");
});


