import { test, expect } from '@playwright/test';
import { faker, Faker } from '@faker-js/faker';
import { MainPage } from '../src/mainPage';
import { SignUpPage } from '../src/signUpPage';
import { FeedPage } from '../src/feedPage';
import { ArticlePage } from '../src/arcticlePage';
import { SettingPage } from '../src/settingPage';
import { LoginPage } from '../src/loginPage';

test.describe ('registrationBeforeEach', () => {
    const email = faker.internet.email();
    const username = faker.person.firstName();
test.beforeEach('user registation', async ({ page }) => {
  const password = faker.internet.password();
  const mainPage = new MainPage(page);
  const sigUpPage = new SignUpPage(page);
  await mainPage.open();
  await mainPage.signUp();
  await sigUpPage.registation(username,email,password);
  await expect(page.getByRole('navigation')).toContainText(username)
});
test('changePassword', async ({ page }) => {
    const feedPage = new FeedPage(page)
    const settingPage = new SettingPage(page);
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const newPass = faker.internet.password()
    await feedPage.goToProfileDropDown()
    await feedPage.goToSetting();
    await settingPage.changePassword(newPass);
    await feedPage.goToProfileDropDown()
    await settingPage.logout();
    await mainPage.login();
    await loginPage.loginWithNewPass(email,newPass)
    await expect(page.getByRole('navigation')).toContainText(username)


  ;
})



})