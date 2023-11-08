import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";

import { IGenerateTokenPrisma } from "../../factories/GenerateTokenPrismaFactory";
import { IGenerateToken } from "../../model/IGenerateToken";
import {
    IGenerateTokenRepository,
    ISaveGenerateTokenDTO,
} from "../IGenerateTokenRepository";

class GenerateTokenPrismaRepository implements IGenerateTokenRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly generateTokenPrismaFactory: IDefaultFactory<
            IGenerateTokenPrisma,
            IGenerateToken
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByUserId(userId: number): Promise<IGenerateToken | undefined> {
        const tokenP = await this.prismaClient.token.findFirst({
            where: {
                userId,
            },
            include: {
                user: true,
            },
        });

        if (!tokenP) return undefined;

        return this.generateTokenPrismaFactory.generate(tokenP);
    }

    async save({
        token,
        userId,
        role,
        expireIn,
    }: ISaveGenerateTokenDTO): Promise<IGenerateToken | undefined> {
        const tokenP = await this.prismaClient.token.create({
            data: {
                token,
                userId,
                expireIn,
                role,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                user: true,
            },
        });

        if (!tokenP) return undefined;

        return this.generateTokenPrismaFactory.generate(tokenP);
    }
}

export { GenerateTokenPrismaRepository };
