export interface FindStoreCatalogFacadeInputDto{
    id: string;
}

export interface FindStoreCatalogFacadeOutputDto{
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

type Product = {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto{
    products: Product[]
}

export interface StoreCatalogFacadeInterface{
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(input: FindStoreCatalogFacadeInputDto): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
