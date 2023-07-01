import Id from "../../../domain/entity/value-object/id.value-object"
import ProductRepository from "../../repository/product.repository"
import CheckStockUseCase from "./check.stock.usecase"

const product = {
    id: new Id('1'),
    name: 'product',
    description: 'product description',
    purchesePrice: 10,
    stock: 12
}

const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("check stock unit test", () =>{
    
    it("should find stock of a product",async () => {
        const productRepository= MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: '1'
        }

        const result = await usecase.execute(input);
        expect(result.productId).toEqual(product.id.id);
        expect(result.stock).toEqual(product.stock);

    })
})