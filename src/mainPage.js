import { faker } from "@faker-js/faker"


export class MainPage {
    constructor (page){
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.goToLogin = page.getByRole('link', { name: 'Login' });
    };
    async signUp () {
        await this.signUpButton.click();
    }

    async open () {
        await this.page.goto('https://realworld.qa.guru/#/');
    }
    async login () {
        await this.goToLogin.click()
    }

}