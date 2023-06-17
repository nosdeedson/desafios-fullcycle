import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindAllProductInputDto } from "../usecase/find-all-products/find-all-product.dto";
import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, StoreCatalogFacadeInterface } from "./store-catalog.facade.inteface";

export interface UseCaseProps{
    findUseCase: UseCaseInterface;
    findAllUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{

    private _findUseCase: UseCaseInterface;
    private _findAllUseCase: UseCaseInterface;

    constructor(props: UseCaseProps){
        this._findAllUseCase = props.findAllUseCase;
        this._findUseCase = props.findUseCase;
    }

    find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return this._findUseCase.execute(input)
    }

    findAll(input: FindAllProductInputDto): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return this._findAllUseCase.execute(input);
    }
    
}