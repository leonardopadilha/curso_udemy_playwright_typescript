import { test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
})

// 1 - Login com sucesso
// Usar usuário standard_user
// Verificar URL da página
// Verificar pelo menos 1 item da página final (visible)
test('Login com sucesso', async ({ page }) => {
  const inputUsername = page.locator('//input[contains(@placeholder, "Username")]')
  await inputUsername.fill('standard_user')

  const inputPassword = page.getByTestId('password')
  await inputPassword.fill('secret_sauce')

  const buttonLogin = page.locator('input[name="login-button"]')
  await buttonLogin.click()

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  const productList = page.locator('.inventory_list')
  const product = productList.locator('.inventory_item').nth(0)
  await expect(product).toBeVisible()
})