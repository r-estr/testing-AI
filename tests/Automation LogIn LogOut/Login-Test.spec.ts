import { Page, Locator, test, expect, } from '@playwright/test';

test('TC_01', { tag: ['@login', '@regression'] }, async ({ page }) => {

    
await page.goto('https://practicetestautomation.com/practice-test-login/');

await page.getByLabel('username').fill('student');

await page.getByLabel('password').fill('Password123');

await page.getByRole('button', {name : 'Submit'}).click();

await page.getByRole('link', {name : 'Log out'}).click();


});