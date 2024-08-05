import { Page, Locator, test, expect, } from '@playwright/test';

test('TC_01', { tag: ['@login', '@regression'] }, async ({ page }) => {


    await page.goto('https://www.saucedemo.com/');

    await page.locator('[id="user-name"]').fill('standard_user');

    await page.locator('[id="password"]').fill('secret_sauce');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.waitForTimeout(3000);
    await page.locator('[id="add-to-cart-sauce-labs-backpack"]').click();

    await page.goto('https://www.saucedemo.com/cart.html');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.goto('https://www.saucedemo.com/checkout-step-one.html');

    await page.locator('[id="first-name"]').fill('Rashmi');

    await page.locator('[id="last-name"]').fill('Trivedi');

    await page.locator('[id="postal-code"]').fill('2765');
    await page.waitForTimeout(3000);
    await page.locator('[id="continue"]').click();

    await page.goto('https://www.saucedemo.com/checkout-step-two.html');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Finish' }).click();

    await page.goto('https://www.saucedemo.com/checkout-complete.html');
    await page.waitForTimeout(3000);

});