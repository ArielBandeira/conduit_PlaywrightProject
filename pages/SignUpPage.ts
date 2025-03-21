import { Page } from "@playwright/test";

export class SignUpPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('/register');
    }
}