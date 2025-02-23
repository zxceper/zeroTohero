import { faker } from "@faker-js/faker"

export class MainPage {
    constructor (page){
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.goToLogin = page.getByRole('button', { name: 'Login' }).click();
    };
    async signUp () {
        await this.signUpButton.click();
    }

    async open () {
        await this.page.goto('https://realworld.qa.guru/#/');
    }
    async goTologin () {
        await this.goToLogin.click
        
    }

}