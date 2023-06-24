import { string } from "yup";
import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"
import Product from "../../domain/product.entity";
import Id from "../../../domain/entity/value-object/id.value-object";

const mockDate = new Date(2000, 1, 1)

describe("place order unit test", () =>{

    describe('getProducts method', () =>{
        beforeAll(() =>{
            jest.useFakeTimers();
            jest.setSystemTime(mockDate)
        });

        afterAll(() =>{
            jest.useRealTimers();
        });

        //@ts-expect-error - no params in constructor
        const placeOrder = new PlaceOrderUseCase();

        it('should throw an error product not found',async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockReturnValue(null)
            }

            //@ts-expect-error - force set catalogFacade
            placeOrder['_catalogFacade'] = mockCatalogFacade;

            await expect(placeOrder['getProduct']('0')).rejects.toThrow(
                new Error('product not found')
            )
        });

        it('should a product',async () => {
            const mockCatalogFacade ={
                find: jest.fn().mockResolvedValue({
                    id: '0',
                    name: 'product',
                    description: 'description',
                    salesPrice: 10
                })
            };

            //@ts-expect-error - force set catalogFacade
            placeOrder['_catalogFacade'] = mockCatalogFacade;
            await expect(placeOrder['getProduct']('0')).resolves.toEqual(
                new Product({
                    id: new Id('0'),
                    name: 'product',
                    description: 'description',
                    salesPrice: 10
                })
            );
            expect(mockCatalogFacade.find).toHaveBeenCalled()

        })
    })

    describe('should validate products methods', () => {
        //@ts-expect-error - no params in constructor
        const placeOrder = new PlaceOrderUseCase();

        it('should throw error if no product selected',async () => {
            const input : PlaceOrderInputDto= {clientId: '1', products: []};

            await expect(placeOrder['validateProducts'](input)).rejects.toThrow(new Error('no product selected'));
        });

        it('should throw an error product without stock',async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) => 
                    Promise.resolve({
                        productId,
                        stock: productId === '1' ? 0 : 1
                    })
                )
            };

            //@ts-expect-error - force set productFacade
            placeOrder['_productFacade'] = mockProductFacade;

            let input : PlaceOrderInputDto = {
                clientId: '1',
                products: [{productId: '1'}]
            }
            await expect(
                placeOrder['validateProducts'](input)
            ).rejects.toThrow(new Error('no stock available'));

            input = {
                clientId: '1',
                products: [{productId: '1'}, {productId: '2'}]
            }
            await expect(
                placeOrder['validateProducts'](input)
            ).rejects.toThrow(new Error('no stock available'))
            expect(mockProductFacade.checkStock).toBeCalledTimes(2);

            input = {
                clientId: '1',
                products: [{productId: '1'}, {productId: '2'}, {productId: '3'}]
            }
            await expect(
                placeOrder['validateProducts'](input)
            ).rejects.toThrow(new Error('no stock available'))
            expect(mockProductFacade.checkStock).toBeCalledTimes(3);
        })
    })


    describe("execute method", () => {

        it('should throw an error when client not found',async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            }
            //@ts-expect-error - no params in constructor
            const placeOrder = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrder['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = {clientId: '0', products: []};

            await expect(placeOrder.execute(input)).rejects.toThrow( new Error('client not found'))
        })

        it('should throw an error if products not valid',async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }
            //@ts-expect-error - no params in constructor
            const placeOrder = new PlaceOrderUseCase();

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrder, 'validateProducts')
            //@ts-expect-error -  not return never
            .mockRejectedValue(new Error('no product selected'));

            //@ts-expect-error - force set clientFacade
            placeOrder['_clientFacade'] = mockClientFacade;

            const input: PlaceOrderInputDto = {clientId: '1', products: []};

            await expect(placeOrder.execute(input)).rejects.toThrow( new Error('no product selected'));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1)
        })


        describe('place an order', () =>{

            const clientProps = {
                id: '1c',
                name: 'jose',
                document: '123',
                email: 'test@test',
                street: 'street',
                number: '1',
                complement: 'complement',
                city: 'city',
                state: 'state',
                zipcode: 'zip'
            };

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps)
            }

            const mockPayment = {
                process: jest.fn(),
            }

            const mockCheckoutRepository = {
                addOrder: jest.fn()
            }

            const mockInvoice = {
                generate: jest.fn().mockResolvedValue({id: 'i1'})
            }

            const placeOrder = new PlaceOrderUseCase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepository as any,
                mockInvoice as any,
                mockPayment as any,
            );

            const products = {
                '1': new Product({
                    id: new Id('1'),
                    name: 'product1',
                    description: 'desc product 1',
                    salesPrice: 10
                }),
                '2': new Product({
                    id: new Id('2'),
                    name: 'product2',
                    description: 'desc product 2',
                    salesPrice: 10
                })
            };

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrder, 'validateProducts')
            //@ts-expect-error- spy on private method
            .mockResolvedValue(null);

            const mockGetProduct = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrder, 'getProduct')
            //@ts-expect-error - not return ever
            .mockImplementation((productId: keyof typeof products) =>{
                return products[productId]
            });

            it('order should not  approved',async () => {
                mockPayment.process = mockPayment.process.mockResolvedValue({
                    transactionId: '1t',
                    orderId: 'o1',
                    amount: 100,
                    status: 'error',
                    createAt: new Date(),
                    updateAt: new Date()
                });

                const input : PlaceOrderInputDto = {
                    clientId: '1',
                    products:[{productId: '1'}, {productId: '2'}]
                };

                let output = await placeOrder.execute(input);
                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(20);
                expect(output.products).toStrictEqual([
                    {productId: '1'},
                    {productId: '2'},
                ]);
                expect(output.status).toBe('pending')
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
                expect(mockClientFacade.find).toHaveBeenCalledWith({id: '1'})
                expect(mockValidateProducts).toHaveBeenCalled();
                expect(mockGetProduct).toHaveBeenCalled()
            });

            it('order should be approved', async () => {
               mockPayment.process = mockPayment.process.mockReturnValue({
                transactionId: '1t',
                orderId: '1o',
                amount: 100,
                status: 'approved',
                createAt: new Date(),
                updateAt: new Date(),
               });
               
               const input : PlaceOrderInputDto ={
                clientId: '1c',
                products: [{productId: '1'}, {productId: '2'}]
               };

                let output = await placeOrder.execute(input);
                expect(output.invoiceId).toBe('i1');
                expect(output.total).toBe(20)
                expect(output.products).toStrictEqual([
                    { productId: '1' },
                    { productId: '2' },
                ]);
                expect(output.status).toBe('approved')
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' })
                expect(mockValidateProducts).toHaveBeenCalled();
                expect(mockValidateProducts).toHaveBeenCalledTimes(1)
                expect(mockGetProduct).toHaveBeenCalledTimes(2)
            });

        });

    })

})