import { IFactoryRepository } from "../repository/IRepository";
import { ItemNotFoundError } from "../repository/error";
import { ApiError } from "../types/api";

export function getFactories(factoriesRepository: IFactoryRepository) {
    return factoriesRepository.getAll();
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
