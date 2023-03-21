import { test } from "../pages/basePage"

test.describe('Cart page test cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('Verify that the user is on the cart page and sees checkout and continue shopping buttons #sanity', async ({ loginPage, cartPage }) => {
        await loginPage.login();
        await cartPage.goToCartPage();
        await cartPage.checkIfOnCartPage();
    })

    test.skip('Verify that the user can add and see an item in the cart page', async ({ loginPage, homePage, cartPage }) => {
        await loginPage.login();
        await homePage.addToCartFirstItem();
        await homePage.getTheFirstItemName();
        await cartPage.goToCartPage();
        await cartPage.getNames();
    })
})