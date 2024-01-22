import { IProduct } from "../model/IProduct";

interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
    categoryGuid: string;
    dayOfWeek?: string;
    fileGuid?: string;
}

interface IUpdateProductDTO {
    guid: string;
    name?: string;
    description?: string;
    categoryGuid?: string;
    price?: number;
    dayOfWeek?: string;
    fileGuid: string;
}

interface IListProductResponse {
    products: IProduct[];
    count: number;
}

interface IListProductRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface IProductRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    create({
        name,
        description,
        price,
        categoryGuid,
        dayOfWeek,
        fileGuid,
    }: ICreateProductDTO): Promise<IProduct | undefined>;
    update({
        guid,
        name,
        description,
        price,
        categoryGuid,
        dayOfWeek,
        fileGuid,
    }: IUpdateProductDTO): Promise<IProduct | undefined>;
    delete(guid: string): Promise<IProduct | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListProductRequest): Promise<IListProductResponse | undefined>;

    findById(id: number): Promise<IProduct | undefined>;
    findByGuid(guid: string): Promise<IProduct | undefined>;
}

export {
    ICreateProductDTO,
    IListProductRequest,
    IListProductResponse,
    IProductRepository,
    IUpdateProductDTO,
};
