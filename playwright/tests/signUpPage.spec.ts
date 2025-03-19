import {expect, test} from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";
import * as fs from "node:fs";


test.describe("SignUpPage", (): void => {
    let signUpPage: SignUpPage;
    let data: {
        validUser1: {
            username: any;
            email: any;
            password: any;
        };
    };

    test.beforeEach(async ({ page }) => {
        console.log('Before tests');
        signUpPage = new SignUpPage(page);
        await signUpPage.goTo();
        data = JSON.parse(fs.readFileSync(`./playwright/test-data/users.json`, 'utf-8'));
    });

    test('Verify that user is able to Sign Up with valid credentials', async ({ page }) => {

        let username = data.validUser1.username;

        // Arrange
        await signUpPage.fillSignUpForm(username, data.validUser1.email, data.validUser1.password);

        // Act
        await signUpPage.clickSignUpButton();

        // Assert
        expect(page.url()).toContain('https://conduit.bondaracademy.com/');
        await expect(page.locator("a[href='/profile/" + username + "']")).toBeVisible();

    });
//
// test('Verify that User is not able to Sign Up with an already registered Email', async ({ page }) => {});
// test('Verify that User is not able to Sign Up with an already registered Username', async ({ page }) => {});
// test('Verify that User is not able to see password values', async ({ page }) => {});
// test('Verify that User is not able to Sign Up with an invalid email format', async ({ page }) => {});
// test('Verify that User is not able to Sign Up with a short password', async ({ page }) => {});

});