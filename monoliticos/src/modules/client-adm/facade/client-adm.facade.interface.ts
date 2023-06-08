import Id from "../../domain/entity/value-object/id.value-object";

export interface AddClientFacadeInptuDto{
    id?: Id;
    name: string;
    email: string;
    address: string;
}

export interface FindClientFacadeInputDto{
    id: string;
}

export interface FindClientFacadeOutputDto{
    id?: string;
    name: string;
    email: string;
    address: string;
    createAt: Date;
    updateAt: Date;
}

export default interface ClientAdmFacadeInterface{
    add(input: AddClientFacadeInptuDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}