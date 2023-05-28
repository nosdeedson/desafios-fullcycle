import Id from "../../../domain/entity/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    id: new Id("1"),
    name: 'product',
    description: 'product description',
    salesPrice: 10
})

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("find a product use case test unit", () =>{

    it("should find a product",async () => {
        const input = {id: '1'};
        const productRepository = MockRepository();
        const usecase =  new FindProductUseCase(productRepository);
        const result = await usecase.execute(input);
        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toEqual(product.id.id);
        expect(result.name).toEqual(product.name);
        expect(result.descrption).toEqual(product.description);
        expect(result.salesPrice).toEqual(product.salesPrice);
        // console.log(result)
    })
})