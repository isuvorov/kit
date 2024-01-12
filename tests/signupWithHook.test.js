import { expect, test } from '@playwright/test';

const email = `test+${Math.random().toString(36).substring(7)}@example.com`;
const password = 'password';
const passwordLong64 = '1234567890123456789012345678901234567890123456789012345678901234';

test.beforeEach(async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/signup');
});

test('Sign up with empty login', async ({ page }) => {
  await page.fill('[name="email"]', '');
  await page.fill('[name="password"]', password);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  const errorMessage = await page.getByTestId('email-error').innerText();
  expect(errorMessage).toBe('Email cannot be blank');
});

test('Sign up with too long password', async ({ page }) => {
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', passwordLong64);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  const errorMessage = await page.getByTestId('password-error').innerText();
  expect(errorMessage).toBe('Password is too long. Maximum length allowed: 64 characters.');
});

test('Sign up with empty password', async ({ page }) => {
  await page.fill('[name="email"]', email);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  const errorMessage = await page.getByTestId('password-error').innerText();
  expect(errorMessage).toBe('Password cannot be blank');
});
