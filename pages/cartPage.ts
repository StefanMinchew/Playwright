import { expect, Locator, Page } from '@playwright/test';

export default class CartPage {

    page: Page;
    checkoutLocator: Locator;
    continueShoppingLocator: Locator;
    cartItemLocator: Locator;
    cartItemNameLocator: Locator;
    removeButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutLocator = page.locator('#checkout');
        this.continueShoppingLocator = page.locator('#continue-shopping');
        this.cartItemLocator = page.locator('.cart_item');
        this.cartItemNameLocator = page.locator('.inventory_item_name')
        this.removeButtonLocator = page.locator('.btn_secondary.btn_small')
    }

    async goToCartPage() {
        await this.page.goto('/cart.html');
    }
    async checkIfOnCartPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.checkoutLocator).toBeVisible()
        await expect(this.continueShoppingLocator).toBeVisible();
    }

    async getTheFirstItemName() {
        const firsteItemHeader = await this.cartItemNameLocator.nth(0).allInnerTexts();
        expect(firsteItemHeader).not.toBeNull();
        return firsteItemHeader.toString();
    }

    async getTheCartItemCount() {
        const count: number = await this.cartItemLocator.count();
        return count
    }

    async removeFirstItem() {
        const initial: number = await this.getTheCartItemCount();
        await this.removeButtonLocator.first().click();
        const after: number = await this.getTheCartItemCount();
        expect(after).toBeLessThan(initial);
    }


}