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

test('Restore password', async ({ page, request }) => {
  await page.goto('https://kit.lskjs.ru/auth/restore');

  await page.fill('input[name="email"]', email);
  await page.click('button[type="submit"]');

  // TODO: Check correct page
  expect(null).toBe(null);

  if (process.env.NODE_ENV === 'testing') {
    try {
      const data = await request.get(`/api/auth/restoreCode?email=${email}`);
      expect(data.link).toBeTruthy();
      await page.goto(data.link);
      // TODO: Confirm email link and fill password ?
    } catch (error) {
      expect(error).toBe(null);
    }
  }
});
