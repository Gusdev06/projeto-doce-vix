import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController implements IController {
    constructor(private readonly useCase: CreateProductUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const {
                name,
                description,
                categoryGuid,
                price,
                dayOfWeek,
                fileGuid,
            } = request.body;

            const product = await this.useCase.execute({
                name,
                description,
                categoryGuid,
                price,
                dayOfWeek,
                fileGuid,
            });

            return response.status(HttpStatusCode.CREATED).json(product);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateProductController };
