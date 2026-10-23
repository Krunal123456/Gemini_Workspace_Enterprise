import { expect, test } from "@playwright/test";

test("feature explorer exposes every plan and filters Business features", async ({ page }) => {
  await page.goto("/en/features");

  const search = page.getByRole("textbox", {
    name: "Search features by keyword, tool, action, or capability",
  });
  await expect(search).toBeVisible();

  const planFilter = page.getByRole("combobox", {
    name: "Filter by Plan Compatibility",
  });
  await expect(planFilter.locator("option")).toHaveCount(17);
  await expect(planFilter.getByRole("option", { name: "Gemini Enterprise Business" })).toHaveCount(1);

  await planFilter.selectOption("gemini-enterprise-business");
  await expect(page.getByRole("heading", { name: "Sources per notebook" })).toBeVisible();
});

test("Gemini Enterprise Business shows only source-published Notebook quotas", async ({ page }) => {
  await page.goto("/en/plans/gemini-enterprise-business");

  const quotas = page.getByRole("region", { name: "Usage limits & quotas" });
  await expect(quotas.getByText("300 per notebook")).toBeVisible();
  await expect(quotas.getByText("500 per user")).toBeVisible();
  await expect(quotas.getByText("15 per user")).toHaveCount(2);
  await expect(quotas.getByText("Notebook queries")).toHaveCount(0);
});

test("Spanish NotebookLM chat details include localized, qualified copy", async ({ page }) => {
  await page.goto("/es/features/notebooklm-chats");

  await expect(page.getByRole("heading", { name: "Chats" })).toBeVisible();
  await expect(page.getByText(/las citas y la fundamentación no eliminan la posibilidad de errores/i)).toBeVisible();
  await expect(page.getByText("Chats dentro de cada cuaderno")).toBeVisible();
  await expect(page.getByText("Abre un cuaderno existente o crea uno nuevo.")).toBeVisible();
});

test("Mind Map count reflects the current plan catalog", async ({ page }) => {
  await page.goto("/en/features");
  const planCount =
    (await page
      .getByRole("combobox", { name: "Filter by Plan Compatibility" })
      .locator("option")
      .count()) - 1;

  await page.goto("/en/mindmap");

  await expect(
    page.getByText(new RegExp(`Interactive Architecture • ${planCount} Plans Across \\d+ Groups`))
  ).toBeVisible();
  await expect(page.getByText(/20 Plans Across/)).toHaveCount(0);
});

test("mobile search, menu, and feature-view controls meet 44px touch targets", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/features");

  const touchTargets = [
    page.locator('button[aria-label*="search" i]').last(),
    page.locator('button[aria-label*="menu" i]').last(),
    page.getByRole("button", { name: "Grid view" }),
    page.getByRole("button", { name: "Table view" }),
  ];

  for (const target of touchTargets) {
    await expect(target).toBeVisible();
    const box = await target.boundingBox();
    if (!box) throw new Error("Expected a visible touch target to have a bounding box");
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
