import { ISprocketRepository } from "../repository/IRepository";
import { ItemNotFoundError } from "../repository/error";
import { ApiError } from "../types/api";
import { SprocketData } from "../types/sprockets";

export async function getSprocketById(
    sprocketRepository: ISprocketRepository,
    sprocketId: string
) {
    try {
        const sprocket = await sprocketRepository.getById(sprocketId);
        return sprocket;
    } catch (error) {
        if (error instanceof ItemNotFoundError) {
            throw new ApiError(error.title, error.detail, 404, error.error);
        }
        throw error;
    }
}

export async function createSprocket(
    sprocketRepository: ISprocketRepository,
    sprocketData: SprocketData
) {
    const sprocket = await sprocketRepository.createSprocket(sprocketData);
    return sprocket;
}

export async function updateSprocket(
    sprocketRepository: ISprocketRepository,
    sprocketId: string,
    sprocket: SprocketData
) {
    try {
        await sprocketRepository.updateSprocket(sprocketId, sprocket);
    } catch (error) {
        if (error instanceof ItemNotFoundError) {
            throw new ApiError(error.title, error.detail, 404, error.error);
        }
        throw error;
    }
}
