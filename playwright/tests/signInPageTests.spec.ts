import { expect, test } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { faker } from '@faker-js/faker';
import * as fs from "node:fs";


test.describe('SignInPage', () => {

    interface UserData {
        validUser1: {
            username: string;
            email: string;
            password: string;
        };
    };
    let signInPage: SignInPage;
    let data: UserData;

    test.beforeEach(async ({ page }) => {

        console.log('Before tests');
        signInPage = new SignInPage(page);
        await signInPage.goTo();
        //TODO
        // Add a more sophisticated way to handle test data
        data = JSON.parse(fs.readFileSync(`./playwright/test-data/users.json`, 'utf-8')) as UserData;

    });

    test('TC08: Verify that user is able to successfully sign in with valid credentials', async ({ page }) => {

        // Arrange
        const email = data.validUser1.email;
        const password = data.validUser1.password;

        await signInPage.fillSignInForm(email, password);

        // Act
        await signInPage.clickSignInButton();

        // Assert
        expect(page.url()).toContain('https://conduit.bondaracademy.com/');
        await expect(page.getByText('Global Feed')).toBeVisible();

    });
    
    test('TC09: Verify that user is unable to sign in with an incorrect password', async ({ page }) => {

        // Arrange
        const email = data.validUser1.email;
        const password = "incorrectpassword";

        await signInPage.fillSignInForm(email, password);

        // Act
        await signInPage.clickSignInButton();

        // Assert
        // Verify that user is not able to sign up
        // Verify that the correct message is displayed
        expect(page.url()).toContain('/login');
        expect(await signInPage.getEmailErrorMessage()).toContain("email or password is invalid");
        await expect(page.getByText('Global Feed')).not.toBeVisible();

    });

    test('TC10: Verify that user is unable to sign in with an unregistered email', async ({ page }) => {

        // Arrange
        const email = faker.internet.email();
        const password = data.validUser1.password;

        await signInPage.fillSignInForm(email, password);

        // Act
        await signInPage.clickSignInButton();

        // Assert
        // Verify that user is not able to sign up
        // Verify that the correct message is displayed
        expect(page.url()).toContain('/login');
        expect(await signInPage.getEmailErrorMessage()).toContain("email or password is invalid");
        await expect(page.getByText('Global Feed')).not.toBeVisible();

    });

    test('TC11: Verify that user is unable to sign in with an empty email', async ({ page }) => {

        // Arrange
        const email = "userjohnmarstonemail.com";
        const password = data.validUser1.password;

        await signInPage.fillSignInForm(email, password);

        // Act
        await signInPage.clickSignInButton();

        // Assert
        // Verify that user is not able to sign up
        // Verify that the correct message is displayed
        expect(page.url()).toContain('/login');
        expect(await signInPage.getEmailErrorMessage()).toContain("email or password is invalid");
        await expect(page.getByText('Global Feed')).not.toBeVisible();

    });

    test('TC12: Verify that user is unable to sign in when all fields are left blank', async ({ page }) => {

        // Arrange
        const email = " ";
        const password = " ";

        await signInPage.fillSignInForm(email, password);

        // Act
        await signInPage.clickSignInButton();

        // Assert
        // Verify that user is not able to sign up
        // Verify that the correct message is displayed
        expect(page.url()).toContain('/login');
        expect(await signInPage.getEmailErrorMessage()).toContain("email can't be blank");
        await expect(page.getByText('Global Feed')).not.toBeVisible();

    });

    test('TC13: Verify that user is presented with a password field that is hidden by default on the sign in page', async () => {
        
        // Arrange
        // Fill sign in form
        const email = data.validUser1.email;
        const password = data.validUser1.password;

        await signInPage.fillSignInForm(email, password);

        // Assert
        // Verify that password field
        await expect(await signInPage.getPasswordField()).toHaveAttribute('type', 'password');

    });

    test('TC14: Verify that user is able to navigate to the Sign Up page from the Sign In page using "Need an account?" link', async ({ page }) => {

        // Act
        // Click sign up button
        await signInPage.clickNeedAnAccountLink();

        // Assert
        expect(page.url()).toContain('/register');
        await expect(page.getByText('Global Feed')).not.toBeVisible();

    });

});