import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";

import { IProduct } from "../model/IProduct";
import {
    IProductRepository,
    IUpdateProductDTO,
} from "../repositories/IProductRepository";
import { UpdateProductValidator } from "./validation/UpdateProductValidator";

export class UpdateProductService
    implements IService<IUpdateProductDTO, IProduct>
{
    constructor(
        private readonly updateProductValidator: UpdateProductValidator,
        private readonly repository: IProductRepository,
    ) {}

    async execute({
        guid,
        name,
        description,
        categoryGuid,
        price,
        dayOfWeek,
        fileGuid,
    }: IUpdateProductDTO): Promise<IProduct> {
        await this.updateProductValidator.validate({
            guid,
            name,
            description,
            categoryGuid,
            price,
            dayOfWeek,
            fileGuid,
        });

        const product = await this.repository.update({
            guid,
            name,
            description,
            categoryGuid,
            price,
            dayOfWeek,
            fileGuid,
        });

        if (!product)
            throw new ErrorHandler(
                "Error updating product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}
