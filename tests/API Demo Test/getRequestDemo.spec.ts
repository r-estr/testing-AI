import { test, expect, } from '@playwright/test';

test('Demo GET Request', { tag: ["@regression_api"] }, async ({ request }) => {

    
    await request.fetch(`https://fakerestapi.azurewebsites.net/api/v1/Activities`, {
        method: "GET",
        
    }).then((apiResponse) => {
        expect(apiResponse.ok()).toBeTruthy();
        expect(apiResponse.status().toString()).toBe('200');
        
    });

});