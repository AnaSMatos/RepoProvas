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

const invalidUrl = {
    name: "Prova 1",
    pdfUrl: "aaa",
    category: "Prática",
    teacher: "Diego Pinho",
    discipline: "React"
}

const invalidCategory = {
    name: "Prova 1",
    pdfUrl: "http://prova.com",
    category: "Não existe",
    teacher: "Diego Pinho",
    discipline: "React"
}

const invalidTeacher = {
    name: "Prova 1",
    pdfUrl: "http://prova.com",
    category: "Prática",
    teacher: "Não existe",
    discipline: "React"
}

const invalidDiscipline = {
    name: "Prova 1",
    pdfUrl: "http://prova.com",
    category: "Prática",
    teacher: "Diego Pinho",
    discipline: "Não existe"
}

const registeredUser = {
    email: "clara@driven.com",
    password: "12345678"
}

describe("Auth tests", () => {
    it("given valid email and password, create an account", async () => {
        const response = await supertest(app).post("/sign-up").send(factory.createUser())
        expect(response.statusCode).toBe(201);
    });

    it("given invalid email, create an account", async () => {
        const response = await supertest(app).post("/sign-up").send(factory.invalidEmail())
        expect(response.statusCode).toBe(422);
    });

    it("given invalid password, create an account", async () => {
        const response = await supertest(app).post("/sign-up").send(factory.invalidPassword())
        expect(response.statusCode).toBe(422);
    });

    it("given valid email and password, access account", async() => {
        const user = factory.createUser()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
    })
})


describe("Test tests", () => {
    //create
    it("given valid structure, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(201)
    })

    it("exemple request without token", async() => {
        const result = await supertest(app).post("/tests").send(test)
        expect(result.status).toEqual(401)
    })

    it("given invalid url, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(invalidUrl).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(422)
    })

    it("given invalid category, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(invalidCategory).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(404)
    })

    it("given invalid teacher, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(invalidTeacher).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(404)
    })

    it("given invalid discipline, create new test", async() => {
        const token = await supertest(app).post("/sign-in").send(registeredUser)
        const response = await supertest(app).post("/tests").send(invalidDiscipline).set("Authorization", `Bearer ${token.text}`)
        expect(response.statusCode).toBe(404)
    })

    //get
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

    it("exemple request without token", async() => {
        const result = await supertest(app).get("/tests?groupBy=teachers").send()
        expect(result.status).toEqual(401)
    })
})