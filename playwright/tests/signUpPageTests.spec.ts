import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import { SignUpPage } from "../pages/SignUpPage";


test.describe("SignUpPage", (): void => {
    let signUpPage: SignUpPage;

    test.beforeEach(async ({ page }) => {
        console.log('Before tests');
        signUpPage = new SignUpPage(page);
        await signUpPage.goTo();
        //TODO
        // Add a more sophisticated way to handle test declaration

    });

    test('TC01: Verify that user is able to successfully sign up with valid credentials', async ({ page }) => {

        // Arrange
        // TODO
        const username = faker.internet.username({ firstName: 'Je', lastName: 'Doe'});
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Act
        await signUpPage.createAccount(username, email, password);

        // Assert
        expect(page.url()).toContain('https://conduit.bondaracademy.com/');
        //TODO
        // This line fails when using 'run until failure'
        await expect(page.getByText('Global Feed')).toBeVisible();
        await expect(page.locator("a[href='/profile/" + username + "']")).toBeVisible();

    });

    test('TC02: Verify that user is unable to sign up with an already registered email', async ({ page }) => {

        // Arrange
        // Create a user and sign up
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await signUpPage.fillSignUpForm(username, email, password);
        await signUpPage.clickSignUpButton();

        // Manually logout
        //TODO
        // Update this code so when there is a page object with an utility to facilitate logging out
        //Go to profile
        await expect(page.getByText('Global Feed')).toBeVisible();

        // Click Edit Profile Settings
        await page.locator("a[href='/settings']").click();
        await expect(page.getByRole('heading', { name: 'Your Settings' })).toBeVisible();

        // Click Logout button
        await page.getByRole('button').last().click();


        // Act
        // Try to crete the same user
        await signUpPage.goTo();
        await signUpPage.fillSignUpForm(faker.internet.username(), email, password);
        await signUpPage.clickSignUpButton();

        // Assert
        // Verify that the correct message is displayed
        //TODO
        // This line fails when using 'run until failure'
        expect(await signUpPage.getEmailErrorMessage()).toContain("email has already been taken");

    });

    test('TC03: Verify that user is unable to sign up with an already registered username', async ({ page }) => {

        // Arrange
        // Create a user and sign up
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await signUpPage.fillSignUpForm(username, email, password);
        await signUpPage.clickSignUpButton();

        // Manually logout
        //TODO
        // Update this code so when there is a page object with an utility to facilitate logging out
        //Go to profile
        await expect(page.getByText('Global Feed')).toBeVisible();

        // Click Edit Profile Settings
        await page.locator("a[href='/settings']").click();
        await expect(page.getByRole('heading', { name: 'Your Settings' })).toBeVisible();

        // Click Logout button
        await page.getByRole('button').last().click();

        // Act
        // Try to crete the same user
        await signUpPage.goTo();
        await signUpPage.fillSignUpForm(username, faker.internet.email(), password);
        await signUpPage.clickSignUpButton();

        // Assert
        // Verify that the correct message is displayed
        expect(await signUpPage.getUsernameErrorMessage()).toContain("username has already been taken");

    });

    test('TC04: Verify that user is unable to sign up with an invalid email format', async ({ page }) => {

        // Arrange
        // Create a user and fill sign up form
        const username = faker.internet.username();
        const email = "invalidemailformat";
        const password = faker.internet.password();

        await signUpPage.fillSignUpForm(username, email, password);

        // Act
        // Click sign up button
        await signUpPage.clickSignUpButton();

        // Assert
        // Verify that user is not able to sign up
        // Verify that the correct message is displayed
        expect(page.url()).toContain('/register');
        expect(await signUpPage.getEmailErrorMessage()).toContain("email is invalid");

    });

    test('TC05: Verify that user is unable to sign up with a short password', async ({ page }) => {

        // Arrange
        // Create a user and fill sign up form
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = "pass";

        await signUpPage.fillSignUpForm(username, email, password);

        // Act
        // Click sign up button
        await signUpPage.clickSignUpButton();

        // Assert
        // Verify that user is not able to sign up
        expect(await signUpPage.getPasswordErrorMessage()).toContain("password is too short (minimum is 8 characters)");
        expect(page.url()).toContain('/register');

    });

    test('TC06: Verify that user is unable to sign up when all fields are left blank', async ({ page }) => {

        // Arrange
        // Create a user and fill sign up form
        const username = " ";
        const email = " ";
        const password = " ";

        await signUpPage.fillSignUpForm(username, email, password);

        // Act
        // Click sign up button
        await signUpPage.clickSignUpButton();

        // Assert
        // Verify that user is not able to sign up
        expect(await signUpPage.getEmailErrorMessage()).toContain("email can't be blank");
        expect(await signUpPage.getUsernameErrorMessage()).toContain("username can't be blank");
        expect(await signUpPage.getPasswordErrorMessage()).toContain("password can't be blank");
        expect(page.url()).toContain('/register');

    });

    test('TC07: Verify that user is presented with a password field that is hidden by default', async () => {

        // Arrange
        // Create a user and fill sign up form
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();
        // Act
        // Fill sign up form
        await signUpPage.fillSignUpForm(username, email, password);

        // Assert
        // Verify that password field
        await expect(await signUpPage.getPasswordField()).toHaveAttribute('type', 'password');

    });


});