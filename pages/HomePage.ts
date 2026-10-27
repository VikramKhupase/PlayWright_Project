import { Locator, Page } from '@playwright/test';
import { RegisterPage } from './RegisterPage';

export class HomePage {
    private readonly page: Page;
    private readonly accountMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountMenu = page.locator('#top-links a[href*="route=account/account"]').first();
    }

    /**
     * Opens the account menu and navigates to registration.
     * @returns Promise<RegisterPage> - The registration page object
     */
    async goToRegister(): Promise<RegisterPage> {
        await this.accountMenu.click();
        await this.page.getByRole('link', { name: 'Register', exact: true }).click();
        return new RegisterPage(this.page);
    }
}