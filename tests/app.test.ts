import supertest from "supertest";
import app from "./../src/app.js"

const variavel = "manda isso"

//exemplo sintaxe
describe("descrição da leva de testes", () =>{
    it("descrição do teste", async () => {
        const response = await supertest(app).post("/rota").send(variavel)
        expect(response.statusCode).toBe(201);
    })
})