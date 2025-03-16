import { test } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";


test('Verify that User is able to Sign Up', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goTo();

    await signUpPage.fillSignUpForm();

    await signUpPage.clickSignUpButton();

    await signUpPage.goTo();

    await signUpPage.fillSignUpForm();

    await signUpPage.clickSignUpButton();

    console.log(await signUpPage.getErrorMessage());
});