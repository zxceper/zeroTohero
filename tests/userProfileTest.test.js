import { test, expect } from '@playwright/test';
import { faker, Faker } from '@faker-js/faker';
import { MainPage } from '../src/mainPage';
import { SignUpPage } from '../src/signUpPage';
import { FeedPage } from '../src/feedPage';
import { ArticlePage } from '../src/arcticlePage';
import { SettingPage } from '../src/settingPage';
import { LoginPage } from '../src/loginPage';

test.describe ('userProfileTests', () => {
test.beforeEach('user registation', async ({ page }) => {
  const feedPage = new FeedPage (page);
  const arcticlePage = new ArticlePage(page)
  const settingPage = new SettingPage (page)
  const loginPage = new LoginPage (page)
  const mainPage = new MainPage(page);
  const sigUpPage = new SignUpPage(page);  
  const username = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  await mainPage.open();
  await mainPage.signUp();
  await sigUpPage.registation(username,email,password);
  await expect(page.getByRole('navigation')).toContainText(username)
});
test('newArcticle', async ({ page }) => {
  const title = faker.lorem.word()
  const about = faker.lorem.words()
  const text = faker.lorem.words(15)
  const tag1 = faker.lorem.word()
  const tag2 = faker.lorem.word()
  const tag3 = faker.lorem.word()
  await feedPage.goToArcticle();
  await arcticlePage.newArcticle(title,about,text,tag1,tag2,tag3)
  await expect(page.getByRole('heading')).toContainText(title);
  await expect(page.getByRole('paragraph')).toContainText(text);
  await expect(page.getByRole('main')).toContainText(tag1)
  await expect(page.getByRole('main')).toContainText(tag2)
  await expect(page.getByRole('main')).toContainText(tag3)
  ;
});
test('passwordUpdate', async ({ page }) => {
  const feedPage = new FeedPage (page);
  const arcticlePage = new ArticlePage(page)
  const settingPage = new SettingPage (page)
  const loginPage = new LoginPage (page)
  const mainPage = new MainPage(page);
  const sigUpPage = new SignUpPage(page);  
  const newPassword = faker.internet.password()
  await feedPage.goToSettings()
  await settingPage.changePassword(newPassword)
  await mainPage.goToLogin();
  await loginPage.login(d,newPassword)
  

  

});



})