import { test } from "../pages/basePage"
import { expect } from "@playwright/test";

test.describe('Cart page test cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('Verify that the user is on the cart page and sees checkout and continue shopping buttons #sanity', async ({ loginPage, cartPage }) => {
        await loginPage.login();
        await cartPage.goToCartPage();
        await cartPage.checkIfOnCartPage();
    })

    test('Verify that the user can add and see an item in the cart page and then remove it', async ({ loginPage, homePage, cartPage }) => {
        await loginPage.login();
        await homePage.addToCartFirstItem();
        const initialName: string = await homePage.getTheFirstItemName();
        await cartPage.goToCartPage();
        const finalName: string = await cartPage.getTheFirstItemName();
        expect(finalName).toEqual(initialName);
        await cartPage.removeFirstItem();
    })
})