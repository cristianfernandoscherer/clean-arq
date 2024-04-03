import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Camiseta vermelha",
                price: 10.20
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Camiseta vermelha");
        expect(response.body.price).toBe(10.20);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Camiseta vermelha",
        });
        expect(response.status).toBe(500);
    });
});
