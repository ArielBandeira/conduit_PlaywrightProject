## ✅ Test Cases - Sign Up Page

### 🔐 Positive Test Cases

- **TC01:** Verify that user is able to successfully sign up with valid credentials.

### 🚫 Negative Test Cases

- **TC02:** Verify that user is unable to sign up with an already registered email.
- **TC03:** Verify that user is unable to sign up with an already registered username.
- **TC04:** Verify that user is unable to sign up with an invalid email format.
- **TC05:** Verify that user is unable to sign up with a short password.
- **TC06:** Verify that user is unable to sign up when all fields are left blank.
- **TC07:** Verify that user is presented with a password field that is hidden by default.

---

## ✅ Test Cases – Sign In Page

### 🔐 Positive Test Cases

- **TC08:** Verify that user is able to successfully sign in with valid credentials.

### 🚫 Negative Test Cases

- **TC09:** Verify that user is unable to sign in with an incorrect password.
- **TC10:** Verify that user is unable to sign in with an unregistered email.
- **TC11:** Verify that user is unable to sign in with an invalid email format.
- **TC12:** Verify that user is unable to sign in when all fields are left blank.
- **TC13:** Verify that user is presented with a password field that is hidden by default on the sign in page.
- **TC14:** Verify that user is able to navigate to the Sign Up page from the Sign In page using "Need an account?" link.

---

## ✅ Test Cases – Home Page

### 🔐 Positive Test Cases

- **TC15:** Verify that the Home Page displays all menu options and areas.
- **TC16:** Verify that article cards contain all key elements.
- **TC17:** Verify that clicking "Read more..." opens the full article.
- **TC18:** Verify that the 'Global Feed' loads articles.
- **TC19:** Verify that clicking a tag filters the article feed.
- **TC20:** Verify that feed tabs switch correctly.

## 🚫 Negative Test Cases

- **TC21:** Verify that no articles appear in "Your Feed" for new users.
- **TC22:** Verify behavior when the article list fails to load (simulated network failure).
- **TC23:** Verify that invalid article data is handled gracefully.

---
//TODO
## ✅ Test Cases – Editor Page

### 🔐 Positive Test Cases

- **TC24:** Verify that clicking on "New Article +" button from the Home Page redirects the user to the Editor page (`[URL]/editor`).
- **TC25:** Verify that the Editor page displays the top header menu similar to other pages.
- **TC26:** Verify that the Editor page contains the following input fields:  
  - Name (Article title)  
  - Summary ("What's this article about")  
  - Text field ("Write your article (in markdown)")  
  - Tags ("Enter tags")
- **TC27:** Verify that the "Publish Article" button is displayed.
- **TC28:** Verify that the user is able to successfully create a new article with valid inputs in all fields and clicking "Publish Article" redirects to the correct article page (`[URL]/article/[Article-title]-[ID]`).
- **TC29:** Verify that tags entered are displayed correctly in the published article.

### 🚫 Negative Test Cases

- **TC30:** Verify that user cannot publish an article if the "Name" field is left blank.
- **TC31:** Verify that user cannot publish an article if the "Summary" field is left blank.
- **TC32:** Verify that user cannot publish an article if the "Text field" is left blank.
- **TC33:** Verify that publishing an article without tags is still allowed (if business logic permits) or shows an appropriate validation message (if required).
- **TC34:** Verify that user receives an error if an invalid character set is entered in the "Tags" field (if restrictions apply).
- **TC35:** Verify that system handles network failure during article publishing gracefully without creating duplicate or partial articles.
