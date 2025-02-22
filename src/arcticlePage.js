import { faker, th } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class ArticlePage {
        constructor (page) {
        this.page = page;
        this.goToTitle = page.getByPlaceholder ('Article Title');
        this.goToAbout = page.getByPlaceholder ('What\'s this article about?');
        this.goToText = page.getByPlaceholder ('Write your article (in markdown)');
        this.goToTag = page.getByRole('textbox', { name: 'Enter tags' })
        this.publish = page.getByRole ('button', {name: 'Publish Article'})
    ;}
            
    async newArcticle(title,about,text,tag1,tag2,tag3) {
        await this.goToTitle.click ()
        await this.goToTitle.fill (title)
        await this.goToAbout.click()
        await this.goToAbout.fill(about)
        await this.goToText.click()
        await this.goToText.fill(text)
        await this.goToTag.click()
        await this.goToTag.fill(`${tag1} ${tag2} ${tag3}`)
        await this.publish.click()
    }}
