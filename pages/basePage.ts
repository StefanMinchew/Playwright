import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";


export const test = base.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
}>({
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use (new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use (new CartPage(page));
    },
})