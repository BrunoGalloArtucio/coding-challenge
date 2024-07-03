import { Document, ObjectId, WithId } from "mongodb";
import { Sprocket, SprocketData } from "../../types/sprockets";
import { ISprocketRepository } from "../IRepository";
import { collections, mongoClient } from "./config";
import { ItemNotFoundError, RepositoryError } from "../error";

export class SprocketRepository implements ISprocketRepository {
    async getById(id: string): Promise<Sprocket> {
        const collection = mongoClient.db().collection(collections.sprockets);
        let doc: WithId<Document> | null = null;
        try {
            doc = await collection.findOne({
                _id: new ObjectId(id),
            });
        } catch (error) {
            throw new RepositoryError(
                "Error While getting by Id",
                `An error ocurred while getting sprocket for id: ${id}`,
                (error as any)?.message ?? error
            );
        }

        if (doc) {
            const { _id, ...rest } = doc;
            return {
                id: _id.toString(),
                ...rest,
            } as Sprocket;
        }
        throw new ItemNotFoundError(
            "Sprocket Not Found",
            `Sprocket not found for id: ${id}`
        );
    }

    async createSprocket(sprocket: SprocketData): Promise<Sprocket> {
        try {
            const collection = mongoClient
                .db()
                .collection(collections.sprockets);
            const doc = await collection.insertOne({ ...sprocket });
            return {
                id: doc.insertedId.toString(),
                ...sprocket,
            };
        } catch (error) {
            throw new RepositoryError(
                "Error While Creating Sprocjet",
                `An error ocurred while creating sprocket for data: ${JSON.stringify(
                    sprocket
                )}`,
                (error as any)?.message ?? error
            );
        }
    }

    async updateSprocket(id: string, sprocket: SprocketData): Promise<void> {
        let doc: WithId<Document> | null = null;
        try {
            const collection = mongoClient
                .db()
                .collection(collections.sprockets);
            doc = await collection.findOneAndUpdate(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: sprocket,
                }
            );
        } catch (error) {
            throw new RepositoryError(
                "Error While Updating Sprocjet",
                `An error ocurred while updating sprocket with id ${id} for data: ${JSON.stringify(
                    sprocket
                )}`,
                (error as any)?.message ?? error
            );
        }
        if (!doc) {
            throw new ItemNotFoundError(
                "Sprocket Not Found",
                `Sprocket not found for id: ${id}`
            );
        }
    }
}
