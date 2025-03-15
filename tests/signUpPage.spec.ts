
import {test} from "@playwright/test";
import {SignUpPage} from "../pages/SignUpPage";



test('Verify that User is able to Sign Up', async ({page}) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goTo();

});