import { Locator, Page } from "@playwright/test";

export class SignUpPage {
    
    // Variables declaration
    private page: Page;
    private usernameLocator: Locator;
    private emailLocator: Locator;
    private passwordLocator: Locator;
    private signUpButtonLocator: Locator;
    // private homePageLinkLocator: Locator;
    // private signInLinkLocator: Locator;
    // private signUpLinkLocator: Locator;
    // private haveAccountLinkLocator: Locator;
    private emailErrorMessage: Locator;
    private usernameErrorMessage: Locator;
    private passwordErrorMessage: Locator;

    // Locators
    constructor(page: Page) {
        this.page = page;
        this.usernameLocator = page.getByPlaceholder('Username');
        this.emailLocator = page.getByPlaceholder('Email');
        this.passwordLocator = page.getByPlaceholder('Password');
        this.signUpButtonLocator = page.getByRole('button', {name: 'Sign up'});
        this.emailErrorMessage = page.getByRole('listitem').getByText('email');
        this.usernameErrorMessage = page.getByRole('listitem').getByText('username');
        this.passwordErrorMessage = page.getByRole('listitem').getByText('password');
    }

    // Methods
    async goTo() {
        await this.page.goto('/register');
    }

    async fillSignUpForm(username: string, email: string, password: string) {
        await this.usernameLocator.fill(username);
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
    }

    async getPasswordField() {
        return this.passwordLocator;
    }

    async clickSignUpButton() {
        await this.signUpButtonLocator.click();
    }

    // async clickHaveAccountLink() {
    //     await this.haveAccountLinkLocator.click();
    // }
    //
    // async clickHomeLink() {
    //     await this.homePageLinkLocator.click();
    // }
    //
    // async clickSignInLink() {
    //     await this.signInLinkLocator.click();
    // }
    //
    // async clickSignUpLink() {
    //     await this.signUpLinkLocator.click();
    // }

    async getEmailErrorMessage() {
        return this.emailErrorMessage.innerText();
    }

    async getUsernameErrorMessage() {
        return this.usernameErrorMessage.innerText();
    }

    async getPasswordErrorMessage() {
        return this.passwordErrorMessage.innerText();
    }

    // Utils
    async createAccount(username: string, email: string, password: string) {
        await this.goTo();
        await this.fillSignUpForm(username, email, password);
        await this.clickSignUpButton();
    }

}