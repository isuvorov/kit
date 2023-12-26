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

  await expect(page.getByText('Email cannot be blank')).toBeVisible();
});

test('Sign up with too long password', async ({ page }) => {
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', passwordLong64);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  await expect(
    page.getByText('Password is too long. Maximum length allowed: 64 characters.'),
  ).toBeVisible();
});

test('Sign up with empty password', async ({ page }) => {
  await page.fill('[name="email"]', email);
  await page.click('[name="tos"]');
  await page.click('[type="submit"]');

  await expect(page.getByText('Password cannot be blank')).toBeVisible();
});
