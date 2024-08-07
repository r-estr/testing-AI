import { test, expect, } from '@playwright/test';

test('Demo POST Request', { tag: ["@regression_api"] }, async ({ request }) => {

    
    await request.fetch(`https://fakerestapi.azurewebsites.net/api/v1/Activities`, {
        method: "POST",
        data: {
  "id": 1,
  "title": "Demo Post Request",
  "dueDate": "2024-08-06T07:02:10.952Z",
  "completed": true
},
    }).then((apiResponse) => {
        expect(apiResponse.ok()).toBeTruthy();
        expect(apiResponse.status().toString()).toBe('200');
        
        apiResponse.body().then(body => {
            let expected = '{  "id": 1,  "title": "Demo Post Request",  "dueDate": "2024-08-06T07:02:10.952Z",  "completed": true}';
            expect(body.toString().replace(/ +/g, "")).toEqual(expected.replace(/ +/g, ""));
        });
    });

});