import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";
import { CreateOrderItemSizeUseCase } from "./CreateOrderItemSizeUseCase";

class CreateOrderItemSizeController implements IController {
    constructor(private readonly useCase: CreateOrderItemSizeUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, price } = request.body;

            const orderitemsize = await this.useCase.execute({
                name,
                price,
            });

            return response.status(HttpStatusCode.CREATED).json(orderitemsize);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateOrderItemSizeController };

