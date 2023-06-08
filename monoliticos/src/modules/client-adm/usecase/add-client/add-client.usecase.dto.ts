import Id from "../../../domain/entity/value-object/id.value-object";

export interface AddClientUsecaseInputDto{
    id?: Id;
    name: string;
    email: string;
    address: string
}

export interface AddClientUsecaseOutputDto{
    id: string;
    name: string;
    email: string;
    address: string;
    createAt: Date;
    updateAt: Date;
}