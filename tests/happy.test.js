import { expect, test } from '@playwright/test';

const login = `test+${Math.random()}@email.com`;
const password = 'password';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signup');
  await page.fill('input[name=email]', login);
  await page.fill('input[name=password]', password);
  await page.click('input[name=tos]');
  await page.click('button[type=submit]');
  const codeLocator = page.locator('input[name=code]');
  await codeLocator.waitFor();
  // replace to email client probably
  const code = await page.evaluate(async (email) => {
    const res = await fetch(`/api/auth/getOTPByEmail?email=${encodeURIComponent(email)}`).then(
      (response) => response.json(),
    );
    return res.data;
  }, login);
  await codeLocator.fill(code);
  await page.click('button[type=submit]');
  const h1 = page.locator('h1');
  await h1.waitFor();
  await expect(h1).toHaveText('Cabinet Index');
});
