import { expect, test } from '@playwright/test';

const login = 'test@email.com';
const password = 'password';
const UppercaseLogin = 'TEST@GMAIL.COM';
const UppercasePassword = 'PASSWORD';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Login is correct', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // Fill login form
  await page.fill('[name="email"]', login);
  // Fill password form
  await page.fill('[name="password"]', password);
  // Click on login button
  await page.click('[type="submit"]');
  // Wait for the success message to appear
  await page.waitForSelector('.w-100.btn.btn-success');
  // Check that the success message is "Success"
  const successMessage = await page.innerText('.w-100.btn.btn-success');
  expect(successMessage).toBe('Success');
});

test('Empty login and password', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // Click on login button
  await page.click('[type="submit"]');
  const elements = await page.$$('.text-danger.form-text');
  // get the first and second element
  const firstElement = elements[0];
  const secondElement = elements[1];
  //  get the text
  const firstElementText = await firstElement.innerText();
  const secondElementText = await secondElement.innerText();
  // check the text

  expect(firstElementText).toBe('Email cannot be black');
  expect(secondElementText).toBe('Password cannot be black');
});

test('Incorrect password', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // Fill login form
  await page.fill('[name="email"]', login);
  // Fill password form
  await page.fill('[name="password"]', '!@32652');
  // Click on login button
  await page.click('[type="submit"]');
  // Wait for the success message to appear
  await page.waitForSelector('.text-center.form-text.text-danger.col-lg-12');
  // Check that the message is "Invalid password"
  const successMessage = await page.innerText('.text-center.form-text.text-danger.col-lg-12');
  expect(successMessage).toBe('Incorrect password');
});

test('Incorrect login', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // Fill login form
  await page.fill('[name="email"]', '2fnf@dm.ru');
  // Fill password form
  await page.fill('[name="password"]', password);
  // Click on login button
  await page.click('[type="submit"]');
  // Wait for the success message to appear
  await page.waitForSelector('.text-center.form-text.text-danger.col-lg-12');
  // Check that the message is "Invalid login"
  const successMessage = await page.innerText('.text-center.form-text.text-danger.col-lg-12');
  expect(successMessage).toBe('Incorrect login');
});

test('Uppercase login and password', async ({ page }) => {
  await page.goto('https://kit.lskjs.ru/auth/login');
  // Fill login form
  await page.fill('[name="email"]', UppercaseLogin);
  // Fill password form
  await page.fill('[name="password"]', UppercasePassword);
  // Click on login button
  await page.click('[type="submit"]');
  // Wait for the success message to appear
  await page.waitForSelector('.w-100.btn.btn-success');
  // Check that the success message is "Success"
  const successMessage = await page.innerText('.w-100.btn.btn-success');
  expect(successMessage).toBe('Success');
});
