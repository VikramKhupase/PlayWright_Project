import { Locator, Page } from '@playwright/test';

export class AccountSuccessPage {
    private readonly page: Page;
    private readonly heading: Locator;
    private readonly accountMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.accountMenu = page.locator('#top-links a[href*="route=account/account"]').first();
    }

    /**
     * Checks whether the account-created confirmation is displayed.
     * @returns Promise<boolean> - True when the confirmation heading is visible
     */
    async isAccountCreated(): Promise<boolean> {
        await this.heading.waitFor({ state: 'visible' });
        return true;
    }

    /** Opens the authenticated account menu and selects My Account. */
    async openMyAccount(): Promise<void> {
        await this.accountMenu.click();
        await this.page.getByRole('link', { name: 'My Account', exact: true }).first().click();
    }
}