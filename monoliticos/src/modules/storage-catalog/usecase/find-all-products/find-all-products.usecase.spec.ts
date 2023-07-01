import Id from "../../../domain/entity/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUseCase from "./find-all-products.usecase"

const product = new Product({
    id: new Id("1"),
    name: 'product',
    description: 'product description',
    salesPrice: 10
})

const product1 = new Product({
    id: new Id("2"),
    name: 'product 1',
    description: 'product1 description',
    salesPrice: 20
})

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product1])),
        find: jest.fn()
    }
}

describe("find all products use case test unit", () =>{

    it("should list all products",async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);
        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products[0].id).toEqual(product.id.id);
        expect(result.products[0].name).toEqual(product.name);
        expect(result.products[0].description).toEqual(product.description);
        expect(result.products[0].salesPrice).toEqual(product.salesPrice);
        expect(result.products[1].id).toEqual(product1.id.id);
        expect(result.products[1].name).toEqual(product1.name);
        expect(result.products[1].description).toEqual(product1.description);
        expect(result.products[1].salesPrice).toEqual(product1.salesPrice);
    });

})