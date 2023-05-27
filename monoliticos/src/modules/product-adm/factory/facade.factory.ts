import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-prodct/add.product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check.stock.usecase";


export default class ProductAdmFacadeFactory {
    

    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUsecase = new CheckStockUseCase(productRepository)
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase, 
            stockUseCase: checkStockUsecase});
        return productFacade
    }

}