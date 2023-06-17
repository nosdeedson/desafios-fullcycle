import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutpuDto, InvoiceFacadeInterface } from "./invoice-facade.interface";

export interface UseCaseInvoiceFacadeProps{
    generate: UseCaseInterface;
    find: UseCaseInterface;
}


export default class InvoiceFacade implements InvoiceFacadeInterface{

    private _generate: UseCaseInterface;
    private _find: UseCaseInterface;

    constructor(props: UseCaseInvoiceFacadeProps){
        this._generate = props.generate;
        this._find = props.find;
    }

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutpuDto> {
        return this._generate.execute(input);
    }
    
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._find.execute(input);
    }

}