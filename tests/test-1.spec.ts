import { test, expect } from '@playwright/test';

test('Gerando código com codegen (Recorder)', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByPlaceholder('Search').fill('st');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('start qa marcos');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('ytd-channel-renderer').filter({ hasText: 'Marcos Franco - Start QA Marcos Franco - Start QA @startqa•795 subscribersMarcos' }).locator('#avatar-section').getByRole('link').click();
  await page.getByRole('heading', { name: 'Marcos Franco - Start QA' }).locator('span').click();
  await expect(page).toHaveTitle('Marcos Franco - Start QA - YouTube');
  await expect(page).toHaveURL('https://www.youtube.com/@startqa')
});

test('Gerando código com codegen (Recorder) record at cursor', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByPlaceholder('Search').fill('st');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('start qa marcos');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('ytd-channel-renderer').filter({ hasText: 'Marcos Franco - Start QA Marcos Franco - Start QA @startqa•795 subscribersMarcos' }).locator('#avatar-section').getByRole('link').click();
  await page.getByRole('heading', { name: 'Marcos Franco - Start QA' }).locator('span').click();
  await expect(page).toHaveTitle('Marcos Franco - Start QA - YouTube');
  await expect(page).toHaveURL('https://www.youtube.com/@startqa')

  // gerado pela funcionalidade Record at cursor
  await page.locator('#tabsContent').getByText('Videos').click();
});