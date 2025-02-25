import { test, expect } from '@playwright/test';
import { faker, Faker } from '@faker-js/faker';
import { MainPage,SignUpPage,FeedPage,ArticleEditorPage,SettingPage,LoginPage,ArticlePage } from '../src/pages/index';
import { UserFieldBuilder,ArcticleBuilder } from '../src/builder/builder/index';

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
test('newArcticle', async ({ page }) => {
  const feedPage = new FeedPage (page);
  const arcticleBuilder = new ArcticleBuilder()
  .addAbout()
  .addTag1()
  .addText()
  .addTag2()
  .addTag3()
  .addTitle()
  .generateArticle();
  const arcticleEditorPage = new ArticleEditorPage (page)
  const articlePage = new ArticlePage (page)
  await feedPage.goToArcticle();
  await arcticleEditorPage.newArcticle(
    arcticleBuilder.title,
    arcticleBuilder.about,
    arcticleBuilder.text,
    arcticleBuilder.tag1,
    arcticleBuilder.tag2,
    arcticleBuilder.tag3);
  await articlePage.goNewToArticlePage(arcticleBuilder.title)
  await expect(articlePage.articleTitle).toContainText(arcticleBuilder.title);
  await expect(articlePage.arcticleText).toContainText(arcticleBuilder.text);
  await expect(articlePage.arcticleTag).toContainText(arcticleBuilder.tag1);
  await expect(articlePage.arcticleTag).toContainText(arcticleBuilder.tag2);
  await expect(articlePage.arcticleTag).toContainText(arcticleBuilder.tag3);
  ;
})



})