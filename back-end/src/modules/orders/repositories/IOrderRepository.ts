import { IOrder } from "../models/IOrder";
import { ICreateOrderItemDTO } from "./IOrderItemRepository";

interface ICreateOrderDTO {
    userId: number;
    total: number;
    orderItem?: ICreateOrderItemDTO[];
}

interface IListOrdersResponse {
    orders: IOrder[];
    count: number;
}

interface IListOrdersRequest {
    search?: string;
    limit?: number;
    offset?: number;
}
interface IOrderRepository {
    findByGuid(guid: string): Promise<IOrder | undefined>;
    create({ userId, total }: ICreateOrderDTO): Promise<IOrder | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListOrdersRequest): Promise<IListOrdersResponse | undefined>;
}

export {
    ICreateOrderDTO,
    IListOrdersRequest,
    IListOrdersResponse,
    IOrderRepository,
};

