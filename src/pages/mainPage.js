import { faker } from "@faker-js/faker"


export class MainPage {
    constructor (page){
        this.page = page;
        this.mainURL = 'https://realworld.qa.guru/#/'
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.goToLogin = page.getByRole('link', { name: 'Login' });
    };
    async signUp () {
        await this.signUpButton.click();
    }

    async open () {
        await this.page.goto(this.mainURL);
    }
    async login () {
        await this.goToLogin.click()
    }

}