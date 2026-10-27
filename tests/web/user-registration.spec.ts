import { randomUUID } from 'node:crypto';
import { expect, test } from '../../fixtures/pageFixtures';

test.use({ appUrl: 'https://tutorialsninja.com/demo/' });

test('Customer registration succeeds @master @sanity @web', async ({
    homePage,
    registerPage,
    accountSuccessPage,
    myAccountPage
}) => {
    const customer = {
        firstName: 'Taylor',
        lastName: 'Tester',
        email: `customer-${randomUUID()}@example.com`,
        telephone: '5551234567',
        password: 'TestPass!2468'
    };

    await test.step('1) Open My Account and select Register', async () => {
        await homePage.goToRegister();
    });

    await test.step('2) Verify the registration page is displayed', async () => {
        expect(await registerPage.isRegisterPageExists()).toBeTruthy();
    });

    await test.step('3) Enter valid customer details', async () => {
        await registerPage.fillRegistrationForm(customer);
    });

    await test.step('4) Accept the Privacy Policy and submit registration', async () => {
        await registerPage.acceptPrivacyPolicy();
        await registerPage.submitRegistration();
    });

    await test.step('5) Verify the account-created confirmation', async () => {
        expect(await accountSuccessPage.isAccountCreated()).toBeTruthy();
    });

    await test.step('6) Verify the new account through account navigation', async () => {
        await accountSuccessPage.openMyAccount();
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    console.log('Customer registration completed successfully.');
});