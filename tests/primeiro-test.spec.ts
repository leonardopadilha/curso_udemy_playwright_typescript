import { test, expect } from "@playwright/test";

test('Visitando a página do playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await page.getByText('Get started').click()
  await expect(page.url()).toContain('/docs/intro')
})