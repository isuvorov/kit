import { expect, test } from '@playwright/test';

const email = `test+${Math.random().toString(36).substring(7)}@example.com`;
const password = 'password';
const passwordLong64 = '1234567890123456789012345678901234567890123456789012345678901234';

test('Sign up with empty login', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // await page.getByText('Sign up').click();
  await page.getByTestId('signup-link').click();
  // Fill login form
  await page.fill('[name="email"]', '');
  // Fill password form
  await page.fill('[name="password"]', password);
  // Click on checkbox
  await page.click('[name="tos"]');
  // Click on signup button
  await page.click('[type="submit"]');
  // const [element] = await page.$$('.text-danger.form-text');
  // const errorMessage = await element.innerText();
  const errorMessage = await page.getByTestId('email-error').innerText();
  expect(errorMessage).toBe('Email cannot be blank');
});

test('Sign up with too long password', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/signup');

  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', passwordLong64);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  // const [element] = await page.$$('.text-danger.form-text');
  // const errorMessage = await element.innerText();
  const errorMessage = await page.getByTestId('password-error').innerText();
  expect(errorMessage).toBe('Password is too long. Maximum length allowed: 64 characters.');
});

test('Sign up with empty password', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/signup');

  await page.fill('[name="email"]', email);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  const errorMessage = await page.getByTestId('password-error').innerText();
  expect(errorMessage).toBe('Password cannot be blank');
});
