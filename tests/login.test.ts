import { test } from "../pages/basePage"

test.describe('Login page test cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test("Login successfully #sanity", async ({ loginPage }) => {
        await loginPage.login();
    })

    test("Login unsuccessful when using wrong password #sanity", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithWrongPassword();
    })

    test("Login unsuccessful when using wrong username #sanity", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithWrongUsername();
    })

    test("Login unsuccessful when using wrong credentials and the error message appears", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithWrongUsernameAndPassword();
    })

    test("Login unsuccessful when missing username and the error message appears", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithMissingUsername();
    })

    test("Login unsuccessful when missing password and the error message appears", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithMissingPassword();
    })

    test("Login unsuccessful when missing credentials and the error message appears", async ({ loginPage }) => {
        await loginPage.loginUnsuccessfulWithMissingUsernameAndPassword();
    })

})