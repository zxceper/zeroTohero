import { test, expect } from '@playwright/test';
import { MainPage,SignUpPage,FeedPage,ArticlePage,SettingPage,LoginPage } from '../src/pages/index';
import { UserFieldBuilder } from '../src/builder/builder/index';

test.describe ('registrationBeforeEach', () => {
   const usernameBuilder =  new UserFieldBuilder()
    .addUserEmail()
    .addUserName()
    .addUserPassword()
    .addUserNewPassword()
    .generateUsesFields(); 
test.beforeEach('user registation', async ({ page }) => {
  const mainPage = new MainPage(page);
  const sigUpPage = new SignUpPage(page);
  const feedPage = new FeedPage (page);
  await mainPage.open();
  await mainPage.signUp();
  await sigUpPage.registation(usernameBuilder.username,usernameBuilder.email,usernameBuilder.password);
  await expect(feedPage.profileNamePlace).toContainText(usernameBuilder.username)

});

test('changePassword', async ({ page }) => {
    const feedPage = new FeedPage(page)
    const settingPage = new SettingPage(page);
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    await feedPage.goToSetting();
    await settingPage.changePassword(usernameBuilder.newPassword);
    await settingPage.logout();
    await mainPage.login();
    await loginPage.loginWithNewPass(usernameBuilder.email,usernameBuilder.newPassword);
    await expect(feedPage.profileNamePlace).toContainText(usernameBuilder.username);


  ;
})



})