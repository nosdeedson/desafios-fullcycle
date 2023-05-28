import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase{
    constructor(private productRepository: ProductGateway){}

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
         const result = await this.productRepository.find(input.id);

         return {
            id: result.id,
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice
         }
    }
    
}