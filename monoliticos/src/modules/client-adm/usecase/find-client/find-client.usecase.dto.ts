export interface FindClientUsecaseInputDto{
    id: string;
}

export interface FindClientUsecaseOutputDto{
    id: string;
    name: string;
    email: string;
    address: string;
    createAt?: Date;
    updateAt?: Date;
}