import { expect, test } from '@playwright/test';

const login = "d.serakov+testing@buzzguru.com"
const password = "123"
const incoorectLogin = "d.serakov+incorrect@buzzguru.com"


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
  // Check that the success message is "Success"  
  expect(successMessage).toBe("Cabinet Index");
});

test('Incorrect login email', async ({ page }) => {
    await page.goto('https://kit.lskjs.ru/auth/login');
  //Fill login form
  await page.fill('[name="email"]', incoorectLogin);
  //Fill password form
  await page.fill('[name="password"]', password);
  //Click on login button
  await page.click('[type="submit"]');

//   await page.waitForTimeout(5000);
//   await page.waitForSelector('.text-center.form-text.text-danger');
  // Check that the success message is "Success"
  const Message = await page.innerText('.text-center.form-text.text-danger');
  сonsole.log(Message);
  expect(Message).toBe("User with this email not found");
});
