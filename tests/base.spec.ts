import { test, expect } from "@playwright/test";

const URL = "http://localhost:4173/";

test.describe("tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("All tasks checked", async ({ page }) => {
    await page.getByText("Сделать дз по матану").click();
    await page.getByText("Покормить себя").click();

    await expect(page).toHaveScreenshot("all_tasks_checked.png");

    await page.getByText("Активные").click();
    await expect(page).toHaveScreenshot("all_tasks_checked_active.png");

    await page.getByText("Завершенные").click();
    await expect(page).toHaveScreenshot("all_tasks_checked_completed.png");
  });

  test("All tasks unchecked", async ({ page }) => {
    await page.getByText("Покормить кошку").click();
    await page.getByText("Покормить собаку").click();

    await expect(page).toHaveScreenshot("all_tasks_unchecked.png");

    await page.getByText("Активные").click();
    await expect(page).toHaveScreenshot("all_tasks_unchecked_active.png");

    await page.getByText("Завершенные").click();
    await expect(page).toHaveScreenshot("all_tasks_unchecked_completed.png");
  });

  test("All tasks deleted", async ({ page }) => {
    await page.getByText("×").first().click();
    await page.getByText("×").first().click();
    await page.getByText("×").first().click();
    await page.getByText("×").first().click();

    await expect(page).toHaveScreenshot("all_tasks_deleted.png");

    await page.getByText("Активные").click();
    await expect(page).toHaveScreenshot("all_tasks_deleted_active.png");

    await page.getByText("Завершенные").click();
    await expect(page).toHaveScreenshot("all_tasks_deleted_completed.png");
  });

  test("New long task check", async ({ page }) => {
    await page
      .getByPlaceholder("Введите тудушку...")
      .fill(
        "Надо бы сделать вообще очень много чего, но я так устал, что делать ничего и не хочется, может просто кошку с собакой покормить?"
      );

    await page.getByText("Добавить").click();
    await expect(page).toHaveScreenshot("new_long_task.png");

    await page.getByText("Активные").click();
    await expect(page).toHaveScreenshot("new_long_task_active.png");

    await page.getByText("Завершенные").click();
    await expect(page).toHaveScreenshot("new_long_task_completed.png");
  });

  test("New short task check", async ({ page }) => {
    await page.getByPlaceholder("Введите тудушку...").fill("Встать с кровати");

    await page.getByText("Добавить").click();
    await expect(page).toHaveScreenshot("new_short_task.png");

    await page.getByText("Активные").click();
    await expect(page).toHaveScreenshot("new_short_task_active.png");

    await page.getByText("Завершенные").click();
    await expect(page).toHaveScreenshot("new_short_task_completed.png");
  });
});
