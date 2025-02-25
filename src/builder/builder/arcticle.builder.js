import { faker } from "@faker-js/faker";

export class ArcticleBuilder {
    addTitle () {
       this.title = faker.lorem.word()
       return this;
    }
    addAbout () {
        this.about = faker.lorem.word()
        return this;
    }
    addText (length = 15) {
        this.text = faker.lorem.words(length)
        return this;
    }
    addTag1 () {
        this.tag1 = faker.lorem.word()
        return this;
        
    }
    addTag2 () {
        this.tag2 = faker.lorem.word()
        return this;
    }
    addTag3 () {
        this.tag3 = faker.lorem.word()
        return this;
    }
    generateArticle () {
        return {
            title : this.title,
            about : this.about,
            text : this.text,
            tag1 : this.tag1,
            tag2 : this.tag2,
            tag3 : this.tag3
        };  

    }

}