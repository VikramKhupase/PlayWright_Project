import dotenv from 'dotenv';
import { test as base } from '@playwright/test';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { RegisterPage } from '../pages/RegisterPage';

dotenv.config();

type PageFixtures = {
    appUrl: string;
    homePage: HomePage;
    registerPage: RegisterPage;
    accountSuccessPage: AccountSuccessPage;
    myAccountPage: MyAccountPage;
};

export const test = base.extend<PageFixtures>({
    appUrl: [process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/', { option: true }],
    homePage: async ({ page, appUrl }, use) => {
        await page.goto(appUrl);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    accountSuccessPage: async ({ page }, use) => {
        await use(new AccountSuccessPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    }
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    if (context.pages().length === 0) {
        await context.close();
    }
});

export { expect } from '@playwright/test';