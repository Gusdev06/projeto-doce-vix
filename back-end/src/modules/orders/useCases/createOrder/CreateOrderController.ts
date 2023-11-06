import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController implements IController {
    constructor(private readonly useCase: CreateOrderUseCase) { }

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { userId, total, orderItem } = request.body;

            const order = await this.useCase.execute({
                userId,
                total,
                orderItem
            });

            return response.status(HttpStatusCode.CREATED).json(order);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateOrderController };
