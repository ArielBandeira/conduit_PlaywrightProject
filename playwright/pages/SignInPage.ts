import { Page, Locator } from '@playwright/test';

export class SignInPage {

    // Variables declaration
    private page: Page;
    emailLocator: Locator;
    passwordLocator: Locator;
    signInButtonLocator: Locator;
    emailErrorMessage: Locator;
    needAndAccountLinkLocator: Locator;

    // Locators
    constructor(page: Page) {
        this.page = page;
        this.emailLocator = page.getByPlaceholder('Email');
        this.passwordLocator = page.getByPlaceholder('Password');
        this.signInButtonLocator = page.getByRole('button', {name: 'Sign in'});
        this.emailErrorMessage = page.getByRole('listitem').getByText('email');
        this.needAndAccountLinkLocator = page.locator('[href*="/register"]').getByText('Need an account?');
    }

    // Methods
    async goTo() {
        await this.page.goto('/login');
    }

    async clickSignInButton() {
        await this.signInButtonLocator.click();
    }

    async getEmailErrorMessage() {
        return this.emailErrorMessage.innerText();
    }

    async getPasswordField() {
        return this.passwordLocator;
    }

    async clickNeedAnAccountLink() {
        await this.needAndAccountLinkLocator.click();
    }

    // Utils
    async fillSignInForm(email: string, password: string) {
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
    }

}