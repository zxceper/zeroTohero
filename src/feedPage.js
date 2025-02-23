import { faker, th } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class FeedPage {
        constructor (page) {
        this.page = page;
        this.moveToArcticle = page.getByRole('link', { name: 'New Article' });
        this.moveToSetting = page.getByRole('link', { name: 'Settings' });
        this.openProfileDropdown = page.locator('.nav-link.dropdown-toggle.cursor-pointer');
    }
        async goToArcticle () {
           await this.moveToArcticle.click() }

        async goToSetting() {
            await this.moveToSetting.click();
        }
        async goToProfileDropDown () {
           await this.openProfileDropdown.click();
        }
   
 }
