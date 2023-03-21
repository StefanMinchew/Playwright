import { expect, Locator, Page } from '@playwright/test';

export default class CartPage {

    page: Page;
    checkoutLocator: Locator;
    continueShoppingLocator: Locator;
    cartItemLocator: Locator;
    cartItemNameLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutLocator = page.locator('#checkout');
        this.continueShoppingLocator = page.locator('#continue-shopping');
        this.cartItemLocator = page.locator('.cart_item');
        this.cartItemNameLocator = page.locator('.inventory_item_name')
    }

    async goToCartPage(){
        await this.page.goto('/cart.html');
    }
    async checkIfOnCartPage(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.checkoutLocator).toBeVisible()
        await expect(this.continueShoppingLocator).toBeVisible();
    }

    async getNames(){
        await expect(this.cartItemLocator).toBeVisible();
        const itemNames = await this.cartItemNameLocator.allInnerTexts();
        return itemNames.toString();
    }


}