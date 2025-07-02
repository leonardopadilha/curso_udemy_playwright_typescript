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

test.only('Ações básicas 2', async({ page }) => {
  // dropdown
  await page.goto('https://the-internet.herokuapp.com/dropdown')
  const dropdown = page.locator('select#dropdown')
  await dropdown.selectOption('1') // selectiona o value
  await expect(dropdown).toHaveValue('1')

  // hover
  await dropdown.selectOption({ label: 'Option 2' })
  await expect(dropdown).toHaveValue('2')
})