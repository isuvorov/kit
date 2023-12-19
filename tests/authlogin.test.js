import { expect, test } from '@playwright/test';

const login = "d.serakov+testing@buzzguru.com"
const password = "123"


test('Check logining', async ({ page }) => {
    await page.goto('https://kit.lskjs.ru/auth/login');
  //Fill login form
  await page.fill('[name="email"]', login);
  //Fill password form
  await page.fill('[name="password"]', password);
  //Click on login button
  await page.click('[type="submit"]');
  // Wait for the success message to appear
  const successMessage = await page.textContent('h1');
  console.log(successMessage);
  // Check that the success message is "Success"  
  expect(successMessage).toBe("Cabinet Index");
});
