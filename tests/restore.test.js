import { expect, test } from '@playwright/test';

const email = `notexistingemail${Math.random()}@gmail.com`;
const incorrectEmailFormat = 'email@examplecom';

test('Restore password with not existing email', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  await page.getByText('Forgot Password?').click();
  // Fill email input
  await page.fill('input[name="email"]', email);
  // Click on restore button
  await page.click('button[type="submit"]');
  const error = await page.waitForSelector('.text-center.form-text.text-danger.col-lg-12');
  const errorMessage = await error.innerText();
  // check the text
  expect(errorMessage).toBe('Email not found');
});

test('Restore password with incorrect email format', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');

  await page.getByText('Forgot Password?').click();
  await page.fill('input[name="email"]', incorrectEmailFormat);
  await page.click('button[type="submit"]');

  await expect(page.getByText('Incorrect email format')).toBeVisible();
});
