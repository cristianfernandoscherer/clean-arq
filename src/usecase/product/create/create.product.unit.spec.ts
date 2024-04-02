import CreateProductUseCase from "./create.product.usecase";
const input = {
  type: "a",
  name: "Camiseta vermelha",
  price: 10.12
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });
  
  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(customerRepository);
    
    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );

    input.name = "Camiseta Vermelha";
  });

  it("should thrown an error when price is less than 0", async () => {
    const customerRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(customerRepository);

    input.price = -1;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
