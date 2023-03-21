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

    constructor(page: Page) {
        this.page = page;
        this.hamburgerLocator = page.locator('#react-burger-menu-btn');
        this.hamburgerItemsLocator = page.locator('#menu_button_container > div > div.bm-menu-wrap > div.bm-menu > nav');
        this.hamburgerCloseLocator = page.locator('#react-burger-cross-btn');
        this.itemListLocator = page.locator('.inventory_item');
        this.itemNameLocator = page.locator('.inventory_item_name')
        this.itemsImages = page.locator('.inventory_item_img');
        this.cartLocator = page.locator('.shopping_cart_link');
        this.filterLocator = page.locator('.product_sort_container');
        this.footerLocator = page.locator('.footer');
        this.twitterLocator = page.locator('.social_twitter');
        this.facebookLocator = page.locator('.social_facebook');
        this.linkedinLocator = page.locator('.social_linkedin');
    }

    async openHamburgerMenu() {
        await this.hamburgerLocator.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.hamburgerItemsLocator).toContainText('logout', { ignoreCase: true });
    }

    async closeHamburgerMenu() {
        await this.openHamburgerMenu();
        await this.hamburgerCloseLocator.click();
        await this.hamburgerItemsLocator.waitFor({ state: 'hidden' });
        await expect(this.hamburgerItemsLocator).toBeHidden();
    }

    async itemsDisplayedOnHomePage() {
        const countItems = await this.itemListLocator.count();
        expect(countItems).toBeGreaterThan(0);
        for (this.itemListLocator of await this.itemListLocator.all()) {
            const itemText: string = await this.itemListLocator.innerText();
            expect(itemText).toContain('Add to cart');
        }
    }

    async addToCartFirstItem(){
        const firstItem = await this.itemListLocator.nth(0);
        const firstItemAddToCartButton = await firstItem.getByText('Add to cart');
        await firstItemAddToCartButton.click();
        expect(firstItem.getByText('Remove')).toBeVisible();  
    }

    async getTheFirstItemName(){
        const firsteItemHeader = await this.itemNameLocator.nth(0).allInnerTexts()
        expect(firsteItemHeader).not.toBeNull();
        return firsteItemHeader.toString();
    }

    async openCart() {
        await this.cartLocator.click();
    }

    async changeFilterOptions() {
        expect(await this.filterLocator.selectOption('az'));
        expect(await this.filterLocator.selectOption('za'));
        expect(await this.filterLocator.selectOption('lohi'));
        expect(await this.filterLocator.selectOption('hilo'));
    }

    async footerIsDisplayedCorrectly() {
        await this.footerLocator.scrollIntoViewIfNeeded();
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
        await popup.waitForLoadState();
        const popupurl: string = await popup.url();
        expect(popupurl).toContain('twitter.com/saucelabs');
    }

    async canOpenFacebook() {
        const popupPromise: any = this.page.waitForEvent('popup');
        await this.facebookLocator.click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        const popupurl: string = await popup.url();
        expect(popupurl).toContain('facebook.com/saucelabs');
    }

    async canOpenLinkedin() {
        const popupPromise: any = this.page.waitForEvent('popup');
        await this.linkedinLocator.click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        const popupurl: string = await popup.url();
        expect(popupurl).toContain('linkedin.com/company/sauce-labs');
    }

}