import { faker } from "@faker-js/faker";

function createUser() {
    return {
        email: faker.internet.email(),
        password: "12345678"
    };
};

function invalidEmail(){
    return {
        email: faker.internet.userName,
        password: "12345678"
    }
}

function invalidPassword(){
    return {
        email: faker.internet.email,
        password: "111"
    }
}

const factory = {
    createUser,
    invalidEmail,
    invalidPassword
};

export default factory;