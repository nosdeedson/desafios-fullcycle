import Id from "../../../domain/entity/value-object/id.value-object";
import AddressClientDto from "../../domain/value-object/address";

export interface AddClientUsecaseInputDto{
    id?: Id;
    name: string;
    email: string;
    document: string;
    address: AddressClientDto
}

export interface AddClientUsecaseOutputDto{
    id: string;
    name: string;
    email: string;
    document: string;
    address: AddressClientDto;
    createAt: Date;
    updateAt: Date;
}