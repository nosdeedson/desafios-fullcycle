import Product from "./product";

describe("Product tests unit", () =>{

    function createProduct(): Product {
        return new Product("1", "product 1", 0);
    }

    it("should throw error when id is empty", () =>{
        let product = createProduct();
        expect( () =>{
            product.id = "";
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () =>{
        let product = createProduct();
        expect( () =>{
            product.changeName("");
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () =>{
        let product = createProduct();
        expect( () =>{
            product.changePrice(-1);
        }).toThrowError("Price should be greater than zero");
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
})