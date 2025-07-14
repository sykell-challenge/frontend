import { test, expect } from '@playwright/test';

// Adjust these URLs and selectors as needed for your app
const baseUrl = 'http://localhost:3000';
const username = `testuser_${Math.random().toString(36).substring(2, 15)}`;
const testUser = {
  username: username,
  email: `${username}@example.com`,
  password: 'TestPassword123!',
};

// Happy path: Register, Login, Search, View Results
test('Happy path: register, login, search, view results', async ({ page }) => {
  // Register
  await page.goto(`${baseUrl}/register`);

  await page.getByLabel('Username').fill(testUser.username);
  await page.getByLabel('Email').fill(testUser.email);
  await page.getByLabel('Password', { exact: true }).fill(testUser.password);
  await page.getByLabel('Confirm Password').fill(testUser.password);
  await page.getByRole('button', { name: /register/i }).click();
  // Wait for redirect to login and success message
  await expect(page).toHaveURL(/login/);

  // Login

  await page.getByLabel('Username').fill(testUser.username);
  await page.getByLabel('Password', { exact: true }).fill(testUser.password);
  await page.getByRole('button', { name: /login/i }).click();
  // Should redirect to home or crawler page, but fallback to /results
  await expect(page).toHaveURL(/(crawler|results|\/)/);

  // Search (Crawl)

  // Crawl/Search
  const testUrl = 'https://example.com';
  await page
    .getByPlaceholder('http://example.com/foo/bar/index.html')
    .fill(testUrl);
  await page.getByRole('button', { name: /add url/i }).click();
  // Wait for results page
  await expect(page).toHaveURL(/results/);
  // Wait for the results table to appear and contain the URL
  await expect(page.getByText('Crawl Results')).toBeVisible();
  await expect(page.getByText(testUrl, { exact: false }).first()).toBeVisible();
});
