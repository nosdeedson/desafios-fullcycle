import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from 'yup';


export default class ProductYupValidator implements ValidatorInterface<Product>{

    validate(entity: Product): void {

        try {
            yup.object()
                .shape({
                    id: yup.string().required('Id is required'),
                    name: yup.string().required('Name is required'),
                    price: yup.number().required().moreThan(0),
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                },
                {
                    abortEarly: false
                })
            
        } catch (errors) {
            const err = errors as yup.ValidationError;
            err.errors.forEach( erro => {
                entity.notification.addError({
                    context: "product",
                    message: erro
                })
            });
        }
    }
}