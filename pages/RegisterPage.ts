import { Locator, Page } from '@playwright/test';

export type CustomerRegistration = {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
};

export class RegisterPage {
    private readonly page: Page;
    private readonly heading: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordConfirmation: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Register Account' });
        this.firstName = page.getByPlaceholder('First Name', { exact: true });
        this.lastName = page.getByPlaceholder('Last Name', { exact: true });
        this.email = page.getByPlaceholder('E-Mail', { exact: true });
        this.telephone = page.getByPlaceholder('Telephone', { exact: true });
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.passwordConfirmation = page.getByPlaceholder('Password Confirm', { exact: true });
        this.privacyPolicy = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }

    /**
     * Checks whether the registration page is displayed.
     * @returns Promise<boolean> - True when the registration heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        await this.heading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Fills the required registration fields.
     * @param customer - Customer registration details
     */
    async fillRegistrationForm(customer: CustomerRegistration): Promise<void> {
        await this.firstName.fill(customer.firstName);
        await this.lastName.fill(customer.lastName);
        await this.email.fill(customer.email);
        await this.telephone.fill(customer.telephone);
        await this.password.fill(customer.password);
        await this.passwordConfirmation.fill(customer.password);
    }

    /** Accepts the registration privacy policy. */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicy.check();
    }

    /** Submits the customer registration form. */
    async submitRegistration(): Promise<void> {
        await this.continueButton.click();
    }
}