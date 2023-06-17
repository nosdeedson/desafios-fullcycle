export interface FindInvoiceFacadeInputDto{
    id: string;
}

export interface FindInvoiceFacadeOutputDto{
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
    createdAt: Date;
    updateAt: Date;
}

export interface GenerateInvoiceFacadeInputDto{
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
}

export interface GenerateInvoiceFacadeOutpuDto{
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
}

export interface InvoiceFacadeInterface{
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutpuDto>;
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}