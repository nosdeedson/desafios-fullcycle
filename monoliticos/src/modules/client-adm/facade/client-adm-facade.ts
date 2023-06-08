import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInptuDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCaseProps{
    addUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class ClientFacade implements ClientAdmFacadeInterface{
    
    private _addUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;

    constructor(props: UseCaseProps){
        this._addUseCase = props.addUseCase;
        this._findUseCase = props.findUseCase;
    }

    add(input: AddClientFacadeInptuDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findUseCase.execute(input)
    }
    
}