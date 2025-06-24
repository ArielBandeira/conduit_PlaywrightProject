import { th } from '@faker-js/faker/.';
import { B } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { Page, Locator } from '@playwright/test';

export class HomePage {
    // Variables
    page: Page;
    newArticleLink: Locator;
    settingsLink: Locator;
    profileLink: Locator;
    yourFeedLink: Locator;
    globalFeedLink: Locator;
    articleCard: Locator;
    articleCardAuthor: Locator;
    articleCardDate: Locator;
    articleCardFavoriteButton: Locator;
    articleCardTitle: Locator;
    articleCardDescription: Locator;
    articleCardReadMore: Locator;
    articleCardTagList: Locator;
    popularTagsArea: Locator;
    firstPopularTag: Locator;
    selectedPopularTag: Locator;
    pickTag: Locator;

    pickTagName: string = '';

    // Locators
    constructor(page: Page) {
        this.page = page;
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.settingsLink = page.getByRole('link', { name: 'Settings' });
        this.profileLink = page.locator("li.nav-item").locator("a[href^='/profile/']");
        this.yourFeedLink = page.getByText('Your Feed', { exact: true });
        this.globalFeedLink = page.getByText('Global Feed', { exact: true });
        this.articleCard = page.locator('.article-preview').first();
        this.articleCardAuthor = page.locator('.author').first();
        this.articleCardDate = page.locator('.date').first();
        this.articleCardFavoriteButton = page.locator('.article-meta button').first();
        this.articleCardTitle = page.locator('.preview-link h1').first();
        this.articleCardDescription = page.locator('.preview-link p').first();
        this.articleCardReadMore = page.locator('.preview-link span').first();
        this.articleCardTagList = page.locator('.preview-link .tag-list').first();
        this.popularTagsArea = page.locator('.sidebar .tag-list');
        this.firstPopularTag = page.locator('.sidebar .tag-list a').first();
        this.selectedPopularTag = page.locator('.feed-toggle li').last();
        this.pickTag = page.locator('.feed-toggle li').filter({ hasText: this.pickTagName });    }

    // Methods
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async getPageURL(): Promise<string> {
        return this.page.url();
    }

    async clickNewArticleLink(): Promise<void> {
        await this.newArticleLink.click();
    }

    async clickSettingsLink(): Promise<void> {
        await this.settingsLink.click();
    }

    async clickProfileLink(): Promise<void> {
        await this.profileLink.click();
    }

    async clickGlobalFeedLink(): Promise<void> {
        await this.globalFeedLink.click();
    }

    async clickYourFeedLink(): Promise<void> {
        await this.yourFeedLink.click();
    }

    async getArticleCardTitle(): Promise<string> {
        return this.articleCardTitle.innerText();
    }

    async clickArticleCardReadMore(): Promise<void> {
        await this.articleCardReadMore.click();
    }

    async getFirstPopularTagName(): Promise<string> {
        return this.firstPopularTag.innerText();
    }

    selectedTag(pickTagName: Locator): Locator {
        return this.selectedPopularTag;
    }

    getArticlesByTag(tagName: string): Locator {
        return this.page.locator('.preview-link').filter({
            has: this.page.locator('.tag-list li', { hasText: tagName })
        });
    }

    getYourFeedNoArticlesMessage(): Locator {
        return this.page.locator('.article-preview').first();
    }

    // Utils

    // Utility function to convert article title to slug for URL validation
    titleToSlug(title: string): string {
        // Replace spaces with dashes, keep special characters, and add "-1" at the end
        return title.replace(/ /g, '-').trim() + '-1';
    }
}

