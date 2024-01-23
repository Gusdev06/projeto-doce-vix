import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { UploadFileUseCase } from "./UploadFIleUseCase";

class UploadFileController implements IController {
    constructor(private readonly useCase: UploadFileUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { file } = request;

            if (!file) {
                return response
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ error: "No file uploaded." });
            }

            const uploadedFile = await this.useCase.execute(file);

            return response.status(HttpStatusCode.CREATED).json(uploadedFile);
        } catch (error) {
            next(error);
        }

        return undefined;
    }
}

export { UploadFileController };

