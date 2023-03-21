import { test } from "../pages/basePage"
import { expect } from "@playwright/test";

test.describe('Home page test cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test.describe('Hamburger menu test cases', () => {
        test('Open hamburger menu #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.openHamburgerMenu();
        })

        test('Close hamburger menu #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.closeHamburgerMenu();
        })
    })

    test.describe('Footer test cases', () => {
        test('Footer is displayed #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.footerIsDisplayedCorrectly();
        })

        test('Open Twitter from footer #socials', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.canOpenTwitter();
        })

        test('Open Facebook from footer #socials', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.canOpenFacebook();
        })

        test('Open LinkedIn from footer #socials', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.canOpenLinkedin();
        })
    })

    test('Items displayed on the home page #sanity', async ({ loginPage, homePage }) => {
        await loginPage.login();
        await homePage.itemsDisplayedOnHomePage();
    })

    test('Change items filter', async ({ loginPage, homePage }) => {
        await loginPage.login();
        await homePage.changeFilterOptions();
    })
    
})

