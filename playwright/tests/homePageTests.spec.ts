import { expect, test } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";
import { SignUpPage } from "../pages/SignUpPage";
import { faker } from '@faker-js/faker';
import * as fs from "node:fs";

test.describe('HomePage', () => {

    interface UserData {
        validUser1: {
            username: string;
            email: string;
            password: string;
        };
    };
    
    let homePage: HomePage;
    let signInPage: SignInPage;
    let signUpPage: SignUpPage;
    let data: UserData;

    test.beforeEach(({ page }) => {
        console.log('Before tests');
        homePage = new HomePage(page);
        signInPage = new SignInPage(page);
        signUpPage = new SignUpPage(page);
        // Load test data only once and reuse the type
        data = JSON.parse(fs.readFileSync(`./playwright/test-data/users.json`, 'utf-8')) as UserData;

        signInPage.goTo();
        signInPage.fillSignInForm(data.validUser1.email, data.validUser1.password);
        signInPage.clickSignInButton();

    });

    test('TC15: Verify that the Home Page displays all menu options and areas.', async () => {

        // Assert
        await expect(homePage.globalFeedLink).toBeVisible();
        await expect(homePage.yourFeedLink).toBeVisible();
        await expect(homePage.popularTagsArea).toBeVisible();
        await expect(homePage.settingsLink).toBeVisible();
        await expect(homePage.newArticleLink).toBeVisible();
        await expect(homePage.profileLink).toBeVisible();
        await expect(homePage.popularTagsArea).toBeVisible();

    });

    test('TC16: Verify that article cards contain all key elements', async () => {

        // Assert
        await expect(homePage.articleCardTitle).toBeVisible();
        await expect(homePage.articleCardAuthor).toBeVisible();
        await expect(homePage.articleCardFavoriteButton).toBeVisible();
        await expect(homePage.articleCardDate).toBeVisible();
        await expect(homePage.articleCardFavoriteButton).toBeVisible();
        await expect(homePage.articleCardDescription).toBeVisible();
        await expect(homePage.articleCardReadMore).toBeVisible();
        await expect(homePage.articleCardTagList).toBeVisible();

        // TODO
        // Verify that footer content is present.
    });

    test('TC17: Verify that clicking "Read more..." opens the full article', async ({ page }) => {

        // Act
        const articleTitle: string = await homePage.getArticleCardTitle();
        const articleCardTitle: string = homePage.titleToSlug(articleTitle);

        
        await homePage.clickArticleCardReadMore();
        await page.waitForNavigation();
        const currentPageUrl: string = await homePage.getPageURL();

        // Assert
        expect(currentPageUrl).toContain('https://conduit.bondaracademy.com/article/' + articleCardTitle);

    });

    test('TC18: Verify that the "Global Feed" loads articles.', async () => {

        // Arrange
        await homePage.clickYourFeedLink();

        // Act
        await homePage.clickGlobalFeedLink();

        // Assert
        await expect(homePage.articleCardTitle).toBeVisible();
        await expect(homePage.articleCardAuthor).toBeVisible();

    });
    
    test('TC19: Verify that clicking a tag filters the article feed.', async () => {
        
        // Arrange
        await homePage.waitForPageLoad();
        const firstTag = await homePage.getFirstPopularTagName();

        console.log(homePage.getArticlesByTag(firstTag));

        // Get count before filtering
        const countBefore = await homePage.getArticlesByTag('').count();

        console.log('Count before filtering:', countBefore);

        // Act
        await homePage.firstPopularTag.click();

        // Wait for the articles to be filtered
        const filteredLocator = homePage.getArticlesByTag(firstTag);
        await filteredLocator.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        // Assert
        // Get count after filtering
        const countAfter = await homePage.getArticlesByTag(firstTag).count();
        console.log('Count after filtering:', countAfter);

        // Assert
        expect(countAfter).toBeGreaterThan(0);
        expect(countAfter).toBeLessThanOrEqual(countBefore);


        // Optionally, check that each article contains the tag
        for (let i = 0; i < countAfter; i++) {
            const tagList = await homePage.getArticlesByTag(firstTag).nth(i).locator('.tag-list').innerText();
            expect(tagList).toContain(firstTag);
        }

    });
    
    test('TC20: Verify that feed tabs switch correctly.', async () => {
        
        // Switch to Your Feed
        await homePage.yourFeedLink.click();

        const articles = homePage.getArticlesByTag('');
        await articles.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await expect(homePage.yourFeedLink).toHaveClass(/active/);

        // Switch to Global Feed
        await homePage.globalFeedLink.click();
        await articles.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await expect(homePage.globalFeedLink).toHaveClass(/active/);

    });

    test('TC21: Verify that no articles appear in "Your Feed" for new users.', async ({ page }) => {

        // Arrange
        // Simulate new user by logging out and signing up a new account
        // TODO
        // Implement a logout method in settings Page
        await homePage.settingsLink.click();
        await expect(page.getByRole('heading', { name: 'Your Settings' })).toBeVisible();
        await page.getByRole('button').getByText('Or click here to logout.').last().click();

        // Create a new user
        const username = faker.internet.username();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await signUpPage.createAccount(username, email, password);

        // Act
        await homePage.yourFeedLink.click();

        // Assert
        await expect(homePage.getYourFeedNoArticlesMessage()).toBeVisible();
    
    });

    test('TC22: Verify behavior when the article list fails to load (simulated network failure).', async ({ page }) => {

        // Arrange
        // Simulate network failure for articles API
        await page.route('**/api/articles*', route => route.abort());

        // Act
        await homePage.globalFeedLink.click();

        // Assert
        // Expect empty state
        await expect(homePage.articleCardTagList).not.toBeVisible();
        await expect(page.getByText('Loading articles...')).toBeVisible();

    });

    test('TC23: Verify that invalid article data is handled gracefully.', async ({ page }) => {
        
        // Arrange
        // Simulate invalid article data by intercepting and returning malformed data
        await page.route('**/api/articles*', page => {
            page.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ articles: [{ title: null, description: null }], articlesCount: 1 })
            });
        });

        // Act
        await homePage.globalFeedLink.click();
        // Expect the UI to not crash and show a fallback or empty state

        // Assert
        await expect(homePage.articleCardTitle).not.toBeVisible();
    });

});