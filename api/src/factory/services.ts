import { IFactoryRepository } from "../repository/IRepository";
import { ItemNotFoundError } from "../repository/error";
import { ApiError } from "../types/api";

export async function getFactories(factoriesRepository: IFactoryRepository) {
    const factories = await factoriesRepository.getAll();
    return factories;
}

export async function getFactoryById(
    factoriesRepository: IFactoryRepository,
    factoryId: string
) {
    try {
        const factory = await factoriesRepository.getById(factoryId);
        return factory;
    } catch (error) {
        if (error instanceof ItemNotFoundError) {
            throw new ApiError(error.title, error.detail, 404, error.error);
        }
        throw error;
    }
}
