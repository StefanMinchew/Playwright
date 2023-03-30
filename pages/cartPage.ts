import { expect, Locator, Page } from '@playwright/test';
import * as error_messages_data from "../test-support-files/error-messages-test-data.json"

export default class CartPage {

    page: Page;
    cartItemLocator: Locator;
    cartItemNameLocator: Locator;
    removeButtonLocator: Locator;
    continueShoppingButtonLocator: Locator;
    checkoutButtonLocator: Locator;
    checkoutInfoLocator: Locator;
    cancelButtonLocator: Locator;
    continueButtonLocator: Locator;
    firstNameLocator: Locator;
    lastNameLocator: Locator;
    postalcodeLocator: Locator;
    errorMessageLocator: Locator;
    finishButtonLocator: Locator;
    totalPriceLocatorWithVAT: Locator;
    totalPriceLocator: Locator;
    taxLocator: Locator;
    checkoutCompleteHeaderLocator: Locator;
    backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButtonLocator = page.locator('#checkout');
        this.continueShoppingButtonLocator = page.locator('#continue-shopping');
        this.cartItemLocator = page.locator('.cart_item');
        this.cartItemNameLocator = page.locator('.inventory_item_name');
        this.removeButtonLocator = page.locator('.btn_secondary.btn_small');
        this.checkoutInfoLocator = page.locator('.checkout_info');
        this.cancelButtonLocator = page.locator('#cancel');
        this.continueButtonLocator = page.locator('#continue');
        this.firstNameLocator = page.locator('input#first-name');
        this.lastNameLocator = page.locator('input#last-name');
        this.postalcodeLocator = page.locator('input#postal-code');
        this.errorMessageLocator = page.locator('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3')
        this.finishButtonLocator = page.locator('#finish');
        this.totalPriceLocatorWithVAT = page.locator('.summary_info_label.summary_total_label');
        this.totalPriceLocator = page.locator('.summary_subtotal_label');
        this.taxLocator = page.locator('.summary_tax_label');
        this.checkoutCompleteHeaderLocator = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async goToCartPage() {
        await this.page.goto('/cart.html');
    }
    async checkIfOnCartPage() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.checkoutButtonLocator).toBeVisible()
        await expect(this.continueShoppingButtonLocator).toBeVisible();
    }

    async getTheFirstItemName() {
        const firsteItemHeader = await this.cartItemNameLocator.nth(0).allInnerTexts();
        expect(firsteItemHeader).not.toBeNull();
        return firsteItemHeader.toString();
    }

    async getTheTotalPrice() {
        const totalPrice: string = (await this.totalPriceLocatorWithVAT.first().allInnerTexts()).toString();
        const getThePrice: number = parseFloat(totalPrice.replace(/[^\d.]/g, ''));
        return getThePrice;
    }

    async getTheTotalPriceWithoutVAT() {
        const totalPrice: string = (await this.totalPriceLocator.first().allInnerTexts()).toString();
        const getThePrice: number = parseFloat(totalPrice.replace(/[^\d.]/g, ''));
        return getThePrice;
    }

    async getTheTax() {
        const tax: string = (await this.taxLocator.first().allInnerTexts()).toString();
        const getTheVAT: number = parseFloat(tax.replace(/[^\d.]/g, ''));
        return getTheVAT;
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

    async clickContinueShoppingButton() {
        await this.continueShoppingButtonLocator.waitFor();
        await this.continueShoppingButtonLocator.click();
        expect(this.page.url()).toContain('inventory.html');
    }

    async clickCheckoutButton() {
        await this.checkoutButtonLocator.waitFor();
        await this.checkoutButtonLocator.click();
        await expect(this.checkoutInfoLocator).toBeVisible();
    }

    async clickCancelButton() {
        const getInitialUrl: string = await this.page.url();
        await this.cancelButtonLocator.waitFor();
        await this.cancelButtonLocator.click();
        const getFinalUrl: string = await this.page.url();
        expect(getFinalUrl).not.toEqual(getInitialUrl);
    }

    async clickContinueButton() {
        if (await this.firstNameLocator.inputValue() === "") {
            await this.continueButtonLocator.click();
            await this.checkFirstNameErrorMessage();
        } else if (await this.lastNameLocator.inputValue() === "") {
            await this.continueButtonLocator.click();
            await this.checkLastNameErrorMessage();
        } else if (await this.postalcodeLocator.inputValue() === "") {
            await this.continueButtonLocator.click();
            await this.checkPostalcodeErrorMessage();
        } else {
            await this.continueButtonLocator.click();
            await expect(this.finishButtonLocator).toBeVisible();
        }
    }

    async clickFinishButton() {
        await this.finishButtonLocator.click();
        const text = await this.checkoutCompleteHeaderLocator.innerText();
        expect(text).toContain('Thank you for your order!')
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click();
        expect(this.page.url()).toContain('inventory.html');
    }

    async fillFirstName() {
        await this.firstNameLocator.fill('John');
    }

    async fillLastName() {
        await this.lastNameLocator.fill('Doe');
    }

    async fillPostalCode() {
        await this.postalcodeLocator.fill('12345');
    }

    async checkFirstNameErrorMessage() {
        const errorMessage: String = await this.errorMessageLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.missingFirstNameErrorMessage);
    }

    async checkLastNameErrorMessage() {
        const errorMessage: String = await this.errorMessageLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.missingLastNameErrorMessage);
    }

    async checkPostalcodeErrorMessage() {
        const errorMessage: String = await this.errorMessageLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.missingPostalcodeErrorMessage);
    }
    
}