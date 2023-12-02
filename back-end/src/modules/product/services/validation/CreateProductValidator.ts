import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";

import {
    ICreateProductDTO,
    IProductRepository,
} from "../../repositories/IProductRepository";

export class CreateProductValidator implements IValidator<ICreateProductDTO> {
    constructor(private readonly repository: IProductRepository) {}

    async validate({
        name,
        description,
        price,
        categoryGuid,
        fileGuid,
    }: ICreateProductDTO): Promise<void> {
        const productExists = await this.repository.findByName(name);
        if (productExists)
            throw new ErrorHandler(
                "Product already exists",
                HttpStatusCode.CONFLICT,
            );

        if (!name)
            throw new ErrorHandler("name is missing", HttpStatusCode.CONFLICT);

        if (!description)
            throw new ErrorHandler(
                "Description is missing",
                HttpStatusCode.CONFLICT,
            );

        if (!price)
            throw new ErrorHandler("price is missing", HttpStatusCode.CONFLICT);

        if (!categoryGuid)
            throw new ErrorHandler(
                "category is missing",
                HttpStatusCode.CONFLICT,
            );

        if (!fileGuid)
            throw new ErrorHandler("file is required", HttpStatusCode.CONFLICT);
    }
}
