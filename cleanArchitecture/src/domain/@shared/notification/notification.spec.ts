import Notification from "./notification"

describe("unit tests for notifications", () =>{

    it("should create errors", () =>{
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer"
        };
        
        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: error message,");

        const error1 = {
            message: "error message1",
            context: "customer"
        };
        
        notification.addError(error1);
        expect(notification.messages("customer")).toBe("customer: error message,customer: error message1,");

        const error2 = {
            message: "error message2",
            context: "customer"
        };
        
        notification.addError(error2);
        expect(notification.messages("customer")).toBe("customer: error message,customer: error message1,customer: error message2,");
    });

    it("should check if notification has at least one error", () =>{
        const notification = new Notification();
        const error ={
            message: 'error message',
            context: "customer"
        };
        notification.addError(error);
        expect(notification.hasErros()).toBe(true)
    });

    it("should get all errors props", () =>{
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer"
        };
        
        notification.addError(error);

        const error1 = {
            message: "error message1",
            context: "customer"
        };
        
        notification.addError(error1);
        expect(notification.getErrors()).toStrictEqual([error, error1])
    })
})