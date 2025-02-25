import { faker } from "@faker-js/faker";

export class UserFieldBuilder {
    addUserName () {
       this.username = faker.person.firstName();
       return this;
    }
    addUserEmail (){
        this.email = faker.internet.email();
        return this;
    }
    addUserPassword (){
        this.password = faker.internet.password();
        return this;
    }
    addUserNewPassword (){
        this.newPassword = faker.internet.password();
        return this;
    }
    generateUsesFields () {
        return {
            username: this.username,
            password: this.password,
            email : this.email,
            newPassword: this.newPassword
        };  

    }

}
