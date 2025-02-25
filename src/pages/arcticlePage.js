import { faker, th } from "@faker-js/faker";

export class ArticlePage {
        constructor (page) {
        this.page = page;
        this.mainURL = 'https://realworld.qa.guru/#/'
        this.articleTitle = page.getByRole('heading');
        this.arcticleText = page.getByRole('paragraph')
        this.arcticleTag = page.getByRole('main')
    }
    async goNewToArticlePage (title) {
        await this.page.goto(this.mainURL+title)
    }
}