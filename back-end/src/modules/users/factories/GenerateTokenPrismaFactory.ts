import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Token as PToken } from "@prisma/client";

import { IGenerateToken } from "../model/IGenerateToken";
import { IUser } from "../model/IUser";

export interface IGenerateTokenPrisma extends Omit<PToken, "user"> {
    user: IUser;
}

export class GenerateTokenPrismaFactory
    implements IDefaultFactory<IGenerateTokenPrisma, IGenerateToken>
{
    async generate(entity: IGenerateTokenPrisma): Promise<IGenerateToken> {
        const result = {
            id: entity.id,
            token: entity.token,
            expireIn: entity.expireIn,
            role: entity.role,
            user: {
                id: entity.user.id,
                guid: entity.user.guid,
                name: entity.user.name,
                email: entity.user.email,
                password: entity.user.password,
                role: entity.user.role,
                createdAt: entity.user.createdAt,
                updatedAt: entity.user.updatedAt,
            },
        };

        return result;
    }
}
