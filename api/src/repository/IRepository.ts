import { Factory, Sprocket, SprocketData } from "../types/sprockets";

export interface IFactoryRepository {
    getAll(): Promise<Factory[]>;
    getById(id: string): Promise<Factory>;
}

export interface ISprocketRepository {
    getById(id: string): Promise<Sprocket>;
    createSprocket(sprocket: SprocketData): Promise<Sprocket>;
    updateSprocket(id: string, sprocket: SprocketData): Promise<void>;
}
