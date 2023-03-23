import { expect, Locator, Page } from '@playwright/test';
import * as error_messages_data from "../test-support-files/error-messages-test-data.json"
import * as credentials_data from "../test-support-files/credentials-test-data.json"

export default class LoginPage {

    page: Page;
    usernameLocator: Locator;
    passwordLocator: Locator;
    loginButtonLocator: Locator;
    errorMessageTextLocator: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameLocator = page.locator('#user-name');
        this.passwordLocator = page.locator('#password');
        this.loginButtonLocator = page.locator('#login-button');
        this.errorMessageTextLocator = page.locator('#login_button_container > div > form > div.error-message-container.error > h3');
    }

    async login(){
        await this.enterUsername(process.env.SAUCE_USERNAME);
        await this.enterPassword(process.env.SAUCE_PASSWORD);
        await this.clickLoginButton();
        expect(await this.page.url()).toContain('inventory');
    }

    async loginUnsuccessfulWithWrongPassword(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.enterUsername(process.env.SAUCE_USERNAME);
        await this.enterPassword(credentials_data.wrongPassword);
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(await this.page.url()).toBe(getUrl);
    }

    async loginUnsuccessfulWithWrongUsername(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.enterUsername(credentials_data.wrongUsername);
        await this.enterPassword(process.env.SAUCE_PASSWORD);
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(this.page.url()).toBe(getUrl);
    }

    async loginUnsuccessfulWithWrongUsernameAndPassword(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.enterUsername(credentials_data.wrongUsername);
        await this.enterPassword(credentials_data.wrongPassword);
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(this.page.url()).toBe(getUrl);
        await this.checkErrorMessageText();
    }

    async loginUnsuccessfulWithMissingUsername(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.enterPassword(credentials_data.wrongPassword);
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(this.page.url()).toBe(getUrl);
        await this.checkErrorMessageTextWhenMissingUsername();
    }

    async loginUnsuccessfulWithMissingPassword(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.enterUsername(credentials_data.wrongUsername);
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(this.page.url()).toBe(getUrl);
        await this.checkErrorMessageTextWhenMissingPassword();
    }

    async loginUnsuccessfulWithMissingUsernameAndPassword(){
        const getUrl: string = this.page.url();
        expect(await this.checkIfErrorMessageIsHidden());
        await this.clickLoginButton();
        expect(await this.checkIfErrorMessageIsVisible());
        expect(this.page.url()).toBe(getUrl);
        await this.checkErrorMessageTextWhenMissingUsername();
    }

    async enterUsername(username: any){
        await this.usernameLocator.type(username);
    }

    async enterPassword(password: any){
        await this.passwordLocator.type(password);
    }

    async clickLoginButton(){
        await this.loginButtonLocator.click();
    }

    async checkIfErrorMessageIsVisible(){
        await this.errorMessageTextLocator.waitFor({ state: 'visible'});
    }

    async checkIfErrorMessageIsHidden(){
        await this.errorMessageTextLocator.waitFor({ state: 'hidden'});
    }

    async checkErrorMessageText(){
        const errorMessage: string = await this.errorMessageTextLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.invalidUsernameAndPasswordErrorMessage);
    }

    async checkErrorMessageTextWhenMissingPassword(){
        const errorMessage: string = await this.errorMessageTextLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.missingPasswordErrorMessage);
    }

    async checkErrorMessageTextWhenMissingUsername(){
        const errorMessage: string = await this.errorMessageTextLocator.innerText();
        expect(errorMessage).toEqual(error_messages_data.missingUsernameErrorMessage);
    }

}