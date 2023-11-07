import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IProduct } from "../../model/IProduct";
import { ICreateProductDTO } from "../../repositories/IProductRepository";
import { CreateProductService } from "../../services/CreateProductService";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(private readonly createProductService: CreateProductService) {}

    async execute({
        name,
        description,
        price,
        categoryGuid,
        dayOfWeek,
        fileGuid,
    }: ICreateProductDTO): Promise<IProduct> {
        return this.createProductService.execute({
            name,
            description,
            price,
            categoryGuid,
            dayOfWeek,
            fileGuid,
        });
    }
}
