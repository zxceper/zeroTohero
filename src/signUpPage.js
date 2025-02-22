import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class SignUpPage {
    constructor (page){
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Your Name' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.expectionRegistation = expect(page.getByRole('navigation'))
    };
    async registation (usernameFaker,emailFaker,passwordFaker) {
        await this.username.click();
        await this.username.fill(usernameFaker);
        await this.email.click();
        await this.email.fill(emailFaker);
        await this.password.click();
        await this.password.fill(passwordFaker);
        await this.signUpButton.click();
    };
}