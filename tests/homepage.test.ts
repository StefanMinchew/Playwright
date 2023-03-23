import { test } from "../pages/basePage"

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

        test('Able to logout #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.openHamburgerMenu();
            await homePage.clickLogout();
        })

        test('Able to go to About page #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.openHamburgerMenu();
            await homePage.clickAbout();
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

    test.describe('Items test cases', () => {
        test('Items displayed on the home page #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.itemsDisplayedOnHomePage();
        })
    
        test('Change items filter', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.changeFilterOptions();
        })

        test('Open first item #sanity', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.openFirstItem();
        })
        test('Back to products', async ({ loginPage, homePage }) => {
            await loginPage.login();
            await homePage.openFirstItem();
            await homePage.backToProdcuts();
        })
    })
})

