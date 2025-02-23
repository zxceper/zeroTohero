import { faker, th } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class SettingPage {
        constructor (page) {
        this.page = page;
        this.goToPassword = page.getByRole('textbox', { name: 'Password' });
        this.sumbitChanges = page.getByRole('button', { name: 'Update Settings' });
        this.gotToLogout = page.getByRole('link', { name: 'Logout' })
        
    }
        async changePassword (newPass) {
            await this.goToPassword.click();
            await this.goToPassword.fill(newPass);
            await this.sumbitChanges.click();

        }
        async logout () {
            await this.gotToLogout.click();

        }

   
 }
