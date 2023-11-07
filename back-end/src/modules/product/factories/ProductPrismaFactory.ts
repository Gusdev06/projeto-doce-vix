import { ICategory } from "@/modules/category/model/ICategory";
import { IDayOfWeek } from "@/modules/dayOfWeek/model/IDayOfWeek";
import { IFile } from "@/modules/file/model/IFile";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Product as PProduct } from "@prisma/client";

import { IProduct } from "../model/IProduct";

export interface IProductPrisma
    extends Omit<PProduct, "category" | "dayOfWeek" | "file"> {
    category: ICategory;
    dayOfWeek?: IDayOfWeek | null;
    files: IFile | null;
}

export class ProductPrismaFactory
    implements IDefaultFactory<IProductPrisma, IProduct>
{
    async generate(entity: IProductPrisma): Promise<IProduct> {
        const {
            id,
            guid,
            name,
            description,
            price,
            createdAt,
            updatedAt,
            category,
            dayOfWeek,
            files,
        } = entity;
        return {
            id,
            guid,
            name,
            description,
            price,
            files: files
                ? {
                      id: files.id,
                      guid: files.guid,
                      path: files.path,
                      createdAt: files.createdAt,
                      updatedAt: files.updatedAt,
                  }
                : undefined,
            category: {
                id: category.id,
                guid: category.guid,
                name: category.name,
                description: category.description,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            },

            dayOfWeek: dayOfWeek
                ? {
                      id: dayOfWeek.id,
                      guid: dayOfWeek.guid,
                      name: dayOfWeek.name,
                      createdAt: dayOfWeek.createdAt,
                      updatedAt: dayOfWeek.updatedAt,
                  }
                : undefined,
            createdAt,
            updatedAt,
        };
    }
}
