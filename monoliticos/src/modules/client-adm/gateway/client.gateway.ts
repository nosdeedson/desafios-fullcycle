import ClientEntity from "../domain/client.entity";

export interface ClientGateway {
    add(client: ClientEntity): Promise<void>;
    find(id: string): Promise<ClientEntity>;
}