import { faker } from "@faker-js/faker"

export class LoginPage {
    constructor (page){
        this.page = page;
        this.goToEmail = page.getByRole('textbox', { name: 'Email' })
        this.goToPassword = page.getByRole('textbox', { name: 'Email' });
        this.clickLogin = page.getByRole('button', { name: 'Login' })
    };

    async login (email, password) {
        await this.goToEmail.click();
        await this.goToEmail.fill(email);
        await this.goToPassword.click();
        await this.goToPassword.fill(password);
        await this.clickLogin.click()
    }

}