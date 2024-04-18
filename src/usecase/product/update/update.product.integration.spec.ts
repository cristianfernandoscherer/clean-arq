import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UUID } from "sequelize";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Camiseta vermelha", 10.20);
        await productRepository.create(product);

        const input = {
            id: "123",
            price: 20.30,
            name: "Camiseta vermelha"
        }

        const result = await usecase.execute(input);

        expect(result.price).toEqual(input.price);
        expect(result.id).toEqual("123");
    });
});
