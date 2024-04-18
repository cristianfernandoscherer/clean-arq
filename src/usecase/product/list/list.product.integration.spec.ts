import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list all products use case", () => {
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

    it("should find all products", async () => {

        const productRepository = new ProductRepository();

        const product = new Product("123", "Camiseta vermelha", 10.20);
        const product2 = new Product("124", "Camiseta preta", 10.30);
        const product3 = new Product("125", "Camiseta azul", 10.40);
        const product4 = new Product("126", "Camiseta amarela", 11.20);
        await productRepository.create(product);
        await productRepository.create(product2);
        await productRepository.create(product3);
        await productRepository.create(product4);

        const usecase = new ListProductUseCase(productRepository);
        await productRepository.findAll();

        const output = {
            products: [
                {
                    "id": "123",
                    "name": "Camiseta vermelha",
                    "price": 10.20
                },
                {
                    "id": "124",
                    "name": "Camiseta preta",
                    "price": 10.30
                },
                {
                    "id": "125",
                    "name": "Camiseta azul",
                    "price": 10.40
                },
                {
                    "id": "126",
                    "name": "Camiseta amarela",
                    "price": 11.20
                }
            ]
        };

        const result = await usecase.execute();

        expect(result).toEqual(output);
    });
});
