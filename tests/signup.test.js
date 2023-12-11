import { expect, test } from '@playwright/test';

const password = 'password';

test('Sign up with empty login', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  await page.getByText('Sign up').click();
  // Fill login form
  await page.fill('[name="email"]', '');
  // Fill password form
  await page.fill('[name="password"]', password);
  // Click on checkbox
  await page.click('[name="tos"]');
  // Click on signup button
  await page.click('[type="submit"]');
  const [element] = await page.$$('.text-danger.form-text');
  const errorMessage = await element.innerText();
  // // check the text
  expect(errorMessage).toBe('Email cannot be blank');
});
