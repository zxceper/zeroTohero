import { faker } from "@faker-js/faker"


export class LoginPage {
    constructor (page){
        this.page = page;
        this.goToEmail  = page.getByRole('textbox', { name: 'Email' })
        this.goToPassword = page.getByRole('textbox', { name: 'Password' });
        this.completeLogin = page.getByRole('button', { name: 'Login' })
    };
    async loginWithNewPass (email,newPass) {
        await this.goToEmail.fill(email)
        await this.goToPassword.fill(newPass)
        await this.completeLogin.click()
    }

}