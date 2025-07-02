import { test, expect } from "@playwright/test";

test('Acessando o site Sauce Demo', async ({ page }) => {
  // Navegando para o site Sauce Demo
  await page.goto('https://www.saucedemo.com/');
  
  // Verificando se a página carregou corretamente
  await expect(page).toHaveTitle(/Swag Labs/);
  
  // Verificando se o formulário de login está presente
  await page.getByTestId('username').fill('standard_user')
  await page.getByTestId('password').fill('secret_sauce')

  const loginButton = await page.locator('input#login-button')
  await expect(loginButton).toBeVisible()

  // Verificando se o botão de login está com o background-color correto, 
  // essa informação é obtida através do devtools na aba computed
  await expect(loginButton).toHaveCSS('background-color', 'rgb(61, 220, 145)')
  await expect(loginButton).toHaveAttribute('value', 'Login')
  await expect(loginButton).not.toBeHidden()

  // Clicando no botão de login
  await page.getByTestId('login-button').click()

  await expect(page.getByTestId('inventory-list')).toBeVisible()
  await expect(page.getByTestId('inventory-list')).not.toBeEmpty()

  const elementsList = await page.locator('.inventory_list .inventory_item').count()
  await expect(elementsList).toBeGreaterThan(0)
  
  // Verificando se a página de produtos está carregada
  const productList = await page.locator('.title').textContent()
  await expect(productList).toEqual('Products')
  
}); 