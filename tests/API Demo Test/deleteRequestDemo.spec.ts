import { test, expect, } from '@playwright/test';

test('Demo DELETE Request', { tag: ["@regression_api"] }, async ({ request }) => {

    let id = 1;
    await request.fetch(`https://fakerestapi.azurewebsites.net/api/v1/Activities/${id}`, {
        method: "DELETE",
        
    }).then((apiResponse) => {
        expect(apiResponse.ok()).toBeTruthy();
        expect(apiResponse.status().toString()).toBe('200');
        
    });

});