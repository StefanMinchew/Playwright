import { expect, Locator, Page } from '@playwright/test';

export default class HomePage {

    page: Page;
    hamburgerLocator: Locator;
    hamburgerItemsLocator: Locator;
    hamburgerCloseLocator: Locator;
    itemListLocator: Locator;
    itemsImages: Locator;
    cartLocator: Locator;
    filterLocator: Locator;
    footerLocator: Locator;
    twitterLocator: Locator;
    facebookLocator: Locator;
    linkedinLocator: Locator;
    itemNameLocator: Locator;
    logoutButtonLocator: Locator;
    aboutButtonLocator: Locator;
    backToProductsButtonLocator: Locator;
    itemPriceLocator: Locator;
    itemButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerLocator = page.locator('.bm-burger-button');
        this.hamburgerItemsLocator = page.locator('.bm-menu');
        this.hamburgerCloseLocator = page.locator('.bm-cross-button');
        this.itemListLocator = page.locator('.inventory_item');
        this.itemNameLocator = page.locator('.inventory_item_name')
        this.itemsImages = page.locator('.inventory_item_img');
        this.cartLocator = page.locator('.shopping_cart_link');
        this.filterLocator = page.locator('.product_sort_container');
        this.footerLocator = page.locator('.footer');
        this.twitterLocator = page.locator('.social_twitter');
        this.facebookLocator = page.locator('.social_facebook');
        this.linkedinLocator = page.locator('.social_linkedin');
        this.logoutButtonLocator = page.locator('#logout_sidebar_link');
        this.aboutButtonLocator = page.locator('#about_sidebar_link')
        this.backToProductsButtonLocator = page.locator('#back-to-products');
        this.itemPriceLocator = page.locator('.inventory_item_price')
        this.itemButtonLocator = page.locator('.btn')
    }

    async openHamburgerMenu() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.hamburgerLocator.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.hamburgerItemsLocator).toContainText('logout', { ignoreCase: true });
    }

    async closeHamburgerMenu() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.openHamburgerMenu();
        await this.hamburgerCloseLocator.click();
        await this.hamburgerItemsLocator.waitFor({ state: 'hidden' });
        await expect(this.hamburgerItemsLocator).toBeHidden();
    }

    async clickLogout() {
        await this.logoutButtonLocator.click();
        expect(this.page.url()).toEqual('https://www.saucedemo.com/');
    }

    async clickAbout() {
        await this.aboutButtonLocator.click();
        const popupurl: string = this.page.url();
        expect(popupurl).toEqual('https://saucelabs.com/');

    }

    async itemsDisplayedOnHomePage() {
        const countItems = await this.itemListLocator.count();
        expect(countItems).toBeGreaterThan(0);
        for (this.itemListLocator of await this.itemListLocator.all()) {
            const itemText: string = await this.itemListLocator.innerText();
            expect(itemText).toContain('Add to cart');
        }
    }

    async openFirstItem() {
        await this.itemNameLocator.first().click();
        expect(this.page.url()).toContain('inventory-item.html?id=');
    }

    async backToProdcuts() {
        await this.backToProductsButtonLocator.click();
        expect(this.page.url()).toContain('inventory.html')
    }

    async addToCartFirstItem() {
        const toAdd: any = await this.itemButtonLocator.first().innerText();
        await this.itemButtonLocator.first().waitFor();
        await this.itemButtonLocator.first().click();
        const added: any = await this.itemButtonLocator.first().innerText();
        expect(added).toContain('Remove');
        expect(added).not.toEqual(toAdd);
    }

    async getTheFirstItemName() {
        const firstItemHeader = await this.itemNameLocator.nth(0).allInnerTexts();
        expect(firstItemHeader).not.toBeNull();
        return firstItemHeader.toString();
    }

    async getTheFirstItemPrice() {
        const firstItemPrice: string = (await this.itemPriceLocator.first().allInnerTexts()).toString();
        const getThePrice: number = parseFloat(firstItemPrice.replace(/[^\d.]/g, ''));
        return getThePrice;
    }

    async openCart() {
        await this.cartLocator.click();
    }

    async changeFilterOptions() {
        expect(await this.filterLocator.selectOption('az')).toBeDefined();
        expect(await this.filterLocator.selectOption('za')).toBeDefined();
        expect(await this.filterLocator.selectOption('lohi')).toBeDefined();
        expect(await this.filterLocator.selectOption('hilo')).toBeDefined();
    }

    async footerIsDisplayedCorrectly() {
        const itemText: string = await this.footerLocator.innerText();
        expect(itemText).toContain('Twitter');
        expect(itemText).toContain('Facebook');
        expect(itemText).toContain('LinkedIn');
        expect(itemText).toContain('Terms of Service');
        expect(itemText).toContain('Privacy Policy');
    }

    async canOpenTwitter() {
        const popupPromise: any = this.page.waitForEvent('popup');
        await this.twitterLocator.click();
        const popup = await popupPromise;
        await popup.waitForLoadState('load');
        expect(popup.url()).toContain('twitter.com');
    }

    async canOpenFacebook() {
        const popupPromise: any = this.page.waitForEvent('popup');
        await this.facebookLocator.click();
        const popup = await popupPromise;
        await popup.waitForLoadState('load');
        expect(popup.url()).toContain('facebook.com');
    }

    async canOpenLinkedin() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.linkedinLocator.click();
        const popup = await popupPromise;
        await popup.waitForLoadState('load');
        expect(popup.url()).toContain('linkedin.com');
    }

}