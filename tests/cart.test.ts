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

    test('Verify that the user can add and see an item in the cart page and then remove it #sanity', async ({ loginPage, homePage, cartPage }) => {
        await loginPage.login();
        await homePage.addToCartFirstItem();
        const initialName: string = await homePage.getTheFirstItemName();
        await cartPage.goToCartPage();
        const finalName: string = await cartPage.getTheFirstItemName();
        expect(finalName).toEqual(initialName);
        await cartPage.removeFirstItem();
    })

    test.describe('Checkout test cases', () => {
        test('User can go back to continue shopping #sanity', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickContinueShoppingButton();
        })

        test('User can continue to checkout #sanity', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
        })

        test('User can cancel the checkout #sanity', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.clickCancelButton();
        })

        test('User can continue the checkout #sanity', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.clickContinueButton();
        })

        test('User can cancel at the finish step #sanity', async ({ loginPage, homePage, cartPage }) => {
            await loginPage.login();
            await homePage.addToCartFirstItem();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.fillFirstName();
            await cartPage.fillLastName();
            await cartPage.fillPostalCode();
            await cartPage.clickContinueButton();
            await cartPage.clickCancelButton();
        })

        test('User can finish buying a product #sanity #skipOnMaster', async ({ loginPage, homePage, cartPage }) => {
            await loginPage.login();
            await homePage.addToCartFirstItem();
            const initial = await homePage.getTheFirstItemPrice();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.fillFirstName();
            await cartPage.fillLastName();
            await cartPage.fillPostalCode();
            await cartPage.clickContinueButton();
            const final = await cartPage.getTheTotalPriceWithoutVAT();
            const tax = await cartPage.getTheTax();
            const total = await cartPage.getTheTotalPrice();
            expect(initial).toEqual(final);
            expect(total).toEqual(final + tax);
            await cartPage.clickFinishButton();
            await cartPage.clickBackHomeButton();
        })
    })

    test.describe('User can see error messages on checkout step one', () => {
        test('User can see first name error message #errormessages', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.fillLastName();
            await cartPage.clickContinueButton();
        })

        test('User can see last name error message #errormessages', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.fillFirstName();
            await cartPage.clickContinueButton();
        })

        test('User can see postalcode error message #errormessages', async ({ loginPage, cartPage }) => {
            await loginPage.login();
            await cartPage.goToCartPage();
            await cartPage.clickCheckoutButton();
            await cartPage.fillFirstName();
            await cartPage.fillLastName();
            await cartPage.clickContinueButton();
        })
    })

})