import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IOrderItemSize } from "../../models/iOrderItemSize";
import {
    ICreateOrderItemSizeDTO,
    IOrderItemSizeRepository,
} from "../../repositories/IOrderItemSizeRepository";

export class CreateOrderItemSizeUseCase
    implements IUseCase<ICreateOrderItemSizeDTO, IOrderItemSize>
{
    constructor(private readonly repository: IOrderItemSizeRepository) {}

    async execute({
        name,
        price,
    }: ICreateOrderItemSizeDTO): Promise<IOrderItemSize> {
        const orderitemsize = await this.repository.create({ name, price });

        if (!orderitemsize) {
            throw new ErrorHandler(
                "Error on create orderitemsize",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return orderitemsize;
    }
}

