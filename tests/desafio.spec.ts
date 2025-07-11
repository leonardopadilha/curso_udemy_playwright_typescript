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

// 2 - Login com usuário locked
// Usar usuário locked_out_user
// Verificar Mensagem de erro
test('Login com usuário locked', async ({ page }) => {
  const inputUsername = page.locator('//input[contains(@placeholder, "Username")]')
  await inputUsername.fill('locked_out_user')

  const inputPassword = page.getByTestId('password')
  await inputPassword.fill('secret_sauce')

  const buttonLogin = page.locator('input[name="login-button"]')
  await buttonLogin.click()

  const erroMessage = page.locator('h3[data-test="error"]')
  await expect(erroMessage).toBeVisible()
  await expect(await erroMessage.textContent()).toEqual('Epic sadface: Sorry, this user has been locked out.')
})

// 3 - Login senha errada
// Verificar Mensagem de erro
test('Login com senha errada', async ({ page }) => {
  const inputUsername = page.locator('//input[contains(@placeholder, "Username")]')
  await inputUsername.fill('locked_out_user')

  const inputPassword = page.getByTestId('password')
  await inputPassword.fill('secret_saucee')

  const buttonLogin = page.locator('input[name="login-button"]')
  await buttonLogin.click()

  const erroMessage = await page.locator('h3[data-test="error"]')
  await expect(erroMessage).toBeVisible()
  await expect(await erroMessage.textContent()).toEqual('Epic sadface: Username and password do not match any user in this service')
})