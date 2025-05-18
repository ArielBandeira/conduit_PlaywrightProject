## ✅ Test Cases - Sign Up Page

### 🔐 Positive Test Cases

- **TC01:** Verify that user is able to successfully sign up with valid credentials

### 🚫 Negative Test Cases

- **TC02:** Verify that user is unable to sign up with an already registered email
- **TC03:** Verify that user is unable to sign up with an already registered username
- **TC04:** Verify that user is unable to sign up with an invalid email format
- **TC05:** Verify that user is unable to sign up with a short password
- **TC06:** Verify that user is unable to sign up when all fields are left blank
- **TC07:** Verify that user is presented with a password field that is hidden by default

---

## ✅ Test Cases – Sign In Page

### 🔐 Positive Test Cases

- **TC01:** Successful Sign In with Valid Credentials

    **Steps:**
    1. Navigate to the Sign In page.
    2. Enter a registered email and valid password.
    3. Click **Sign in**.

    **Expected Result:** User is successfully logged in and redirected to the home page.

### 🚫 Negative Test Cases

- **TC02:** Sign In with Incorrect Password

    **Steps:**
    1. Use a valid email with an incorrect password.
    2. Click **Sign in**.

    **Expected Result:** Error message appears, e.g., "email or password is invalid".

- **TC03:** Sign In with Unregistered Email

    **Steps:**
    1. Enter an email that is not registered.
    2. Enter any password and click **Sign in**.

    **Expected Result:** Error message is displayed.

- **TC04:** Sign In with Invalid Email Format

    **Steps:**
    1. Enter a malformed email (e.g., `user@` or `email.com`).
    2. Attempt to sign in.

    **Expected Result:** Client-side validation prevents form submission or error message appears.

- **TC05:** Leave All Fields Blank

    **Steps:**
    1. Click **Sign in** without filling in any fields.

    **Expected Result:** Client-side validation or error messages are displayed for required fields.

- **TC06:** Password Field Hidden by Default

    **Steps:**
    1. Check if the password input field uses `type="password"`.

    **Expected Result:** Password is hidden (masked input).

- **TC07:** Navigate to Sign In from Sign Up Page

    **Steps:**
    1. Go to the Sign Up page.
    2. Click on the "Have an account?" link.

    **Expected Result:** User is redirected to the Sign In page.
