import { faker } from "@faker-js/faker";

function createUser() {
    return {
        email: faker.internet.email(),
        password: "12345678"
    };
};

const factory = {
    createUser
};

export default factory;