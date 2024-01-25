import { IOrderItemSize } from "../models/iOrderItemSize";

interface ICreateOrderItemSizeDTO {
    name: string;
    price: number;
}

interface IUpdateOrderItemSizeDTO {
    name: string;
    price: number;
}

interface IOrderItemSizeRepository {
    create({
        name,
        price,
    }: ICreateOrderItemSizeDTO): Promise<IOrderItemSize | undefined>;
}

export {
    ICreateOrderItemSizeDTO,
    IOrderItemSizeRepository,
    IUpdateOrderItemSizeDTO,
};

