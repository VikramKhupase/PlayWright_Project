import { Locator, Page } from '@playwright/test';

export class MyAccountPage {
    private readonly heading: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.heading = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
        this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
    }

    /**
     * Checks that the authenticated account dashboard is displayed.
     * @returns Promise<boolean> - True when the dashboard and logout option are visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        await this.heading.waitFor({ state: 'visible' });
        await this.logoutLink.waitFor({ state: 'visible' });
        return true;
    }
}