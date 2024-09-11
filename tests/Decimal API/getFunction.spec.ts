import { test, expect, } from '@playwright/test';

test('getFunction', { tag: ["@regression_api2"] }, async ({ request }) => {


    await request.fetch(`https://sandbox.vahanacloud.com/router/engine/v1/gatewayProcessor`, {
        method: "GET",
        headers: {
            clientsecret: "64398bad-6858-42f3-bd72-7441197cb83c",
            requestid: "requestId01",
            appId: "ADMIN-PORTAL-BGQIQLMILQ",
            orgId: "VLIBRARY-LKBBJW41RM",
            servicename: "ADMIN_PORTAL_API",
            module: "org-function",
            module_2: "get"
        },
        data: {
            "code": "PhD"
        },
    }).then((apiResponse) => {
        console.log(apiResponse)
        expect(apiResponse.ok()).toBeTruthy();
        expect(apiResponse.status().toString()).toBe('200');

        apiResponse.body().then(body => {
            let expected = '{    "status": "success",    "success": {        "code": "200",        "message": "User(s) Details Found",        "details": {            "effectiveDate": "2024-03-19",            "ineffectiveDate": "2025-07-24",            "status": false,            "createdBy": "sandeep.kumar@decimal.co.in",            "createdTimestamp": "2024-03-19T16:23:02.903+05:30",            "modifiedBy": "sandeep.kumar@decimal.co.in",            "modifiedTimestamp": "2024-03-19T17:09:08.131+05:30",            "approvalRemarks": "By Super Admin",            "approvalBy": "sandeep.kumar@decimal.co.in",            "approvalStatus": "APPROVED",            "finalApprovalBy": "sandeep.kumar@decimal.co.in",            "approvalTimestamp": "2024-03-19T17:09:08.131+05:30",            "recordId": "49941a20-22fc-41dc-899c-ecff5bbb4b73",            "isDelete": false,            "attributes": null,            "udfVal1": "",            "udfLbl1": "",            "udfVal2": "",            "udfLbl2": "",            "udfVal3": "",            "udfLbl3": "",            "udfVal4": "",            "udfLbl4": "",            "udfVal5": "",            "udfLbl5": "",            "udfVal6": "",            "udfLbl6": "",            "udfVal7": "",            "udfLbl7": "",            "udfVal8": "",            "udfLbl8": "",            "udfVal9": "",            "udfLbl9": "",            "udfVal10": "",            "udfLbl10": "",            "code": "Test123",            "name": "sandeep",            "type": null,            "headEmpId": "",            "sortSeq": 0,            "internalFlag": false,            "description": "jj"        }    }}';
            expect(body.toString().replace(/ +/g, "")).toEqual(expected.replace(/ +/g, ""));
        });
    });

});