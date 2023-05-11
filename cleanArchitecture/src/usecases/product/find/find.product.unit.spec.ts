import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "product", 10);

const MockRepository = () =>{
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}


describe("unit test find product use case", () =>{

    it("should find a product",async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {id: '123'};
        const result = await useCase.execute(input);
        expect(result.id).toEqual(product.id)
        expect(result.name).toEqual(product.name)
        expect(result.price).toEqual(product.price)
    })
})