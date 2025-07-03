import { test, expect } from "@playwright/test";

test('Ações básicas', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/forgot_password')
  const emailInput = page.locator('#email')
  await emailInput.fill('startqa@email.com')
  await emailInput.fill('')
  await emailInput.pressSequentially('123456')
  await expect(emailInput).toHaveValue('123456')

  await page.goto('https://the-internet.herokuapp.com/')
  const checkboxesLink = page.locator('a[href$="checkboxes"]')
  await checkboxesLink.click()

  // checkboxes
  const checkbox1 = page.locator('input[type="checkbox"]').nth(0)
  await checkbox1.check()
  
  const checkbox2 = page.locator('input[type="checkbox"]').nth(1)
  await checkbox2.uncheck()
  
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).not.toBeChecked()
})

test('Ações básicas 2', async({ page }) => {
  // dropdown
  await page.goto('https://the-internet.herokuapp.com/dropdown')
  const dropdown = page.locator('select#dropdown')
  await dropdown.selectOption('1') // selectiona o value
  await expect(dropdown).toHaveValue('1')

  await dropdown.selectOption({ label: 'Option 2' })
  await expect(dropdown).toHaveValue('2')
})

test('Ações básicas 3', async({ page }) => {
    // hover
    await page.goto('https://the-internet.herokuapp.com/hovers')
    for (let i = 0; i <= 2; i++) {
      const img = page.locator('div.figure').nth(i)
      const imgInfo = img.locator('.figcaption')
      await img.hover()
      await expect(imgInfo).toBeVisible()
    }
})

test('Ações básicas 4', async({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers')

  // hover
  const img0 = page.locator('div.figure').nth(0)
  const img1 = page.locator('div.figure').nth(1)
  const img2 = page.locator('div.figure').nth(2)

  const imgInfo0 = img0.locator('.figcaption')
  const imgInfo1 = img1.locator('.figcaption')
  const imgInfo2 = img2.locator('.figcaption')

  await img0.hover()
  await expect(imgInfo0).toBeVisible()
  await expect(imgInfo1).not.toBeVisible()
  await expect(imgInfo2).not.toBeVisible()

  await img1.hover()
  await expect(imgInfo1).toBeVisible()
  await expect(imgInfo0).not.toBeVisible()
  await expect(imgInfo2).not.toBeVisible()

  await img2.hover()
  await expect(imgInfo2).toBeVisible()
  await expect(imgInfo0).not.toBeVisible()
  await expect(imgInfo1).not.toBeVisible()

  await imgInfo2.getByRole('link').click()
  // await img2.locator('a').click()
  const url = 'https://the-internet.herokuapp.com/users/3'
  await expect(page).toHaveURL(url)
})