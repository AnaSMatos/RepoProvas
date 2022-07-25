import supertest from "supertest";
import app from "./../src/app.js"
import factory from "./factory.js"
import prisma from "./../src/database.js"

beforeEach(async () => {
    await prisma.$executeRaw`
        TRUNCATE TABLE tests
    `;
});

const test  = {
    name: "Prova 1",
    pdfUrl: "http://prova.com",
    category: "Prática",
    teacher: "Diego Pinho",
    discipline: "React"
}

const registeredUser = {
    email: "clara@driven.com",
    password: "12345678"
}

//testes do login
describe("Auth tests", () => {
    it("given valid email and password, create an account", async () => {
        const response = await supertest(app).post("/sign-up").send(factory.createUser())
        expect(response.statusCode).toBe(201);
    });

    it("given valid email and password, access account", async() => {
        const user = factory.createUser()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
    })
})

//testes da prova

describe("Test tests", () => {
    it("given valid structure, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(201)
    })
    it("get tests by disciplines", async () => {
		const token = await supertest(app).post("/sign-in").send(registeredUser)
		const result = await supertest(app).get("/tests?groupBy=disciplines").send().set("Authorization", `Bearer ${token.text}`)
		expect(result.status).toEqual(200)
	})
    it("get tests by teachers", async () => {
		const token = await supertest(app).post("/sign-in").send(registeredUser)
		const result = await supertest(app).get("/tests?groupBy=teachers").send().set("Authorization", `Bearer ${token.text}`)
		expect(result.status).toEqual(200)
	})
})