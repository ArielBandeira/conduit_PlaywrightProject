import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
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
        //TODO
        // Add a more sophisticated way to handle test data
        data = JSON.parse(fs.readFileSync(`./playwright/test-data/users.json`, 'utf-8'));
    });

    test('Verify that user is able to Sign Up with valid credentials', async ({ page }) => {

        // Arrange
        let username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await signUpPage.fillSignUpForm(username, email, password);

        // Act
        await signUpPage.clickSignUpButton();

        // Assert
        expect(page.url()).toContain('https://conduit.bondaracademy.com/');
        await expect(page.getByText('Global Feed')).toBeVisible();
        await expect(page.locator("a[href='/profile/" + username + "']")).toBeVisible();

    });

     test('Verify that user is not able to Sign Up with an already registered Email', async ({ page }) => {

         // Arrange
         // Create a user and sign up
         const username = faker.internet.username();
         const email = faker.internet.email();
         const password = faker.internet.password();

         await signUpPage.fillSignUpForm(username, email, password);
         await signUpPage.clickSignUpButton();

         // Manually logout
         //TODO
         // Update this code so when there is a page object with an utility to facilitate loggin out
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
         expect(await signUpPage.getEmailErrorMessage()).toContain("email has already been taken");

     });

     test('Verify that User is not able to Sign Up with an already registered Username', async ({ page }) => {

         // Arrange
         // Create a user and sign up
         const username = faker.internet.username();
         const email = faker.internet.email();
         const password = faker.internet.password();

         await signUpPage.fillSignUpForm(username, email, password);
         await signUpPage.clickSignUpButton();

         // Manually logout
         //TODO
         // Update this code so when there is a page object with an utility to facilitate loggin out
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

     // This test should fail
     test('Verify that User is not able to Sign Up with an invalid email format', async ({ page }) => {

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
         expect(page.url()).not.toContain('/register');

     });

     test('Verify that User is not able to Sign Up with a short password', async ({ page }) => {

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
         expect(await signUpPage.getUsernameErrorMessage()).toContain("password should have at least 8 characters");
         expect(page.url()).not.toContain('/register');

     });

});