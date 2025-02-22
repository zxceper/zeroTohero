import { faker, th } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class FeedPage {
        constructor (page) {
        this.page = page;
        this.moveToArcticle = page.getByRole('link', { name: 'New Article' });
        
    }
        async goToArcticle () {
           await this.moveToArcticle.click() }
   
 }
