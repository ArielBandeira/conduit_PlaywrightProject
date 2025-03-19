import {Locator, Page} from "@playwright/test";

export class SignUpPage {
    private page: Page;
    private usernameLocator: Locator;
    private emailLocator: Locator;
    private passwordLocator: Locator;
    private signUpButtonLocator: Locator;
    // private homePageLinkLocator: Locator;
    // private signInLinkLocator: Locator;
    // private signUpLinkLocator: Locator;
    // private haveAccountLinkLocator: Locator;
    private errorMessages: Locator;

    // Locators
    constructor(page: Page) {
        this.page = page;
        this.usernameLocator = page.getByPlaceholder('Username');
        this.emailLocator = page.getByPlaceholder('Email');
        this.passwordLocator = page.getByPlaceholder('Password');
        this.signUpButtonLocator = page.getByRole('button', {name: 'Sign up'});
        this.errorMessages = page.locator('.error-messages');
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

    async getErrorMessage() {
        await this.errorMessages.innerText();
    }

    // Utils
    async createAccount(username: string, email: string, password: string) {
        await this.goTo();
        await this.fillSignUpForm(username, email, password);
        await this.clickSignUpButton();
    }

}