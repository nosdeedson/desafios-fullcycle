import CreateProductUsecase from "./create.product.usecase";

const input = {
    id: '123',
    name: 'product',
    price: 10
}

const MockRepository= () =>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};

describe("unit test create product use case", () =>{

    it("should create a product",async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);

        const output = await usecase.execute(input);
        expect(output).toEqual(input)
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);

        input.name = "";
        await expect(usecase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when id is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        // tem que setar o name novamente porque input foi alterando no método acima
        input.name = "product teste";
        input.id = ""
        await expect(usecase.execute(input)).rejects.toThrow(
            "Id is required"
        );
    });

    it("should thrown an error when id is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUsecase(productRepository);
        // tem que setar o id novamente porque input foi alterando no método acima
        input.id = "1234"
        input.price = -10;
        await expect(usecase.execute(input)).rejects.toThrow(
            "Price should be greater than zero"
        );
    });
})