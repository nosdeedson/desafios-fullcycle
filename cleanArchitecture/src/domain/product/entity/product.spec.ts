import Product from "./product";

describe("Product tests unit", () =>{

    function createProduct(): Product {
        return new Product("1", "product 1", 0);
    }

    it("should throw error when id is empty", () =>{
        expect( () =>{
            let product = new Product("", "product", 10)
        }).toThrowError("product: Id is required");
    });

    it("should throw error when name is empty", () =>{
        expect( () =>{
            let product = new Product("123", "", 10)
        }).toThrowError("product: Name is required");
    });

    it("should throw error when price is less than zero", () =>{
        expect( () =>{
            let product = new Product('123', 'product', -10)
        }).toThrowError("product: Price should be greater than zero");
    });

    it("should change name", () =>{
        let product = createProduct();
        product.changeName('prod 2')
        expect(product.name).toBe("prod 2");
    });

    it("should change price", () =>{
        let product = createProduct();
        expect(product.price).toBe(0);
        product.changePrice(10);
        expect(product.price).toBe(10);
    })

    it("should throw two erros", () =>{
        expect( 
            () =>{ let product = new Product("123", "", -1)}
            ).toThrowError("product: Name is required,product: Price should be greater than zero")
    })

    it("should throw three erros", () =>{
        expect( 
            () =>{ let product = new Product("", "", -1)}
            ).toThrowError("product: Id is required,product: Name is required,product: Price should be greater than zero")
    })
})