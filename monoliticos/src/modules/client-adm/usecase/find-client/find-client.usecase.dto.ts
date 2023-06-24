import AddressClientDto from "../../domain/value-object/address";

export interface FindClientUsecaseInputDto{
    id: string;
}

export interface FindClientUsecaseOutputDto{
    id: string;
    name: string;
    email: string;
    address: AddressClientDto;
    document: string;
    createAt?: Date;
    updateAt?: Date;
}