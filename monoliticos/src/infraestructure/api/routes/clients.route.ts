import express, { Response, Request } from 'express';
import AddressClientDto from '../../../modules/client-adm/domain/value-object/address';
import AddClientUseCase from '../../../modules/client-adm/usecase/add-client/add-client.usecase';
import ClientRepository from '../../../modules/client-adm/repository/client.repository';
import FindClientUseCase from '../../../modules/client-adm/usecase/find-client/find-client.usecase';
import Id from '../../../modules/domain/entity/value-object/id.value-object';

export const clienttRoute = express.Router();

clienttRoute.post('/', async (req: Request, res: Response) => {
    try {
        const input = {
            id: new Id(req.body.id),
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new AddressClientDto(
                req.body.address.street,
                req.body.address.number,
                req.body.address.city,
                req.body.address.zipCode,
                req.body.address.state,
                req.body.address.complement
            )
        }
        const usecase = new AddClientUseCase(new ClientRepository());
        const output = await usecase.execute(input);
        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

clienttRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        const usecase = new FindClientUseCase(new ClientRepository());
        const output = await usecase.execute({id: req.params.id})
        res.status(200).send(output)
    } catch (error) {
        res.status(500).send(error);
    }
});