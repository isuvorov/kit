import { expect, test } from '@playwright/test';

const restoreEmail = 'test-restore@gmail.com';
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
  const baseURL = 'http://localhost:3000';
  await page.goto(`${baseURL}/auth/restore`);

  await page.fill('input[name="email"]', restoreEmail);
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="restore-sent"]');

  const response = await request.get(
    `${baseURL}/api/auth/getOTPByEmail?email=${encodeURIComponent(
      restoreEmail,
    )}&token=dmVyeSBzZWNyZXQgdG9rZW4=`,
  );
  const { data } = await response.json();

  expect(data).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      code: expect.any(String),
      params: expect.objectContaining({
        email: restoreEmail,
      }),
    }),
  );

  await page.goto(
    `${baseURL}/auth/resetPassword?_id=${data.id}&code=${data.code}&email=${restoreEmail}`,
  );
  const password = `password${Math.random()}`;
  await page.fill('input[name="newPassword"]', password);
  await page.click('button[type="submit"]');
  const h3 = page.locator('h3');
  await h3.waitFor();

  await expect(h3).toHaveText('Sign In');
});
