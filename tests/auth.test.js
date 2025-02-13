// @ts-check
import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';
import { faker, Faker } from '@faker-js/faker';

const getRandomName = function() {faker.person.firstName()};
const getRandomEmail = function () { faker.internet.email()};
const getRandomPassword = function () {faker.internet.password()};


test('test', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/#/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: ' Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(`${getRandomName}`);
  await page.getByRole('textbox', { name: 'Email' }).fill(`${getRandomEmail}`);
  await page.getByRole('textbox', { name: 'Password' }).fill(`${getRandomPassword}`);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(`${getRandomName}`);
});