import Id from "../../../domain/entity/value-object/id.value-object";

export interface FindProductInputDto{
    id: string;
}

export interface FindProductOutputDto{
    id: Id;
    name: string;
    description: string;
    salesPrice: number;
}