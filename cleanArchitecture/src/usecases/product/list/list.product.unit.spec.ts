import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product('123', "product", 12 );
const product1 = new Product('1234', "product 1", 12 );

const MockRepository = () =>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product1])),
        update: jest.fn(),
    }
}

describe("unit teste for listing products", () =>{

    it("should list products",async () => {
        const productRepository = MockRepository();
        const useCase = new ListProductUseCase(productRepository);

        const results = await useCase.execute({});
        expect(results.products[0].id).toEqual(product.id)
        expect(results.products[0].name).toEqual(product.name)
        expect(results.products[0].price).toEqual(product.price)
        expect(results.products[1].id).toEqual(product1.id)
        expect(results.products[1].name).toEqual(product1.name)
        expect(results.products[1].price).toEqual(product1.price)
    })
})