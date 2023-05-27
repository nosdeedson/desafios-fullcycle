import ProductGateway from "../../gateway/product.gateway";
import ProductRepository from "../../repository/product.repository";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {

    private _productRepository :ProductGateway;

    constructor(productRepository: ProductGateway){
        this._productRepository = productRepository
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto>{
        const result = await this._productRepository.find(input.productId);
        return {
            productId: result.id.id,
            stock: result.stock
        }
    }
}