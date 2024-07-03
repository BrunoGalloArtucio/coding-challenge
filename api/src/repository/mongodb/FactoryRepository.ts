import { Document, ObjectId, WithId } from "mongodb";
import { Factory } from "../../types/sprockets";
import { IFactoryRepository } from "../IRepository";
import { collections, mongoClient } from "./config";
import { ItemNotFoundError, RepositoryError } from "../error";

export class FactoryRepository implements IFactoryRepository {
    async getAll(): Promise<Factory[]> {
        try {
            const collection = mongoClient
                .db()
                .collection(collections.factories);
            const docs = await collection.find().toArray();

            return docs.map(
                ({ _id, ...rest }) =>
                    ({
                        id: _id.toString(),
                        ...rest,
                    } as Factory)
            );
        } catch (error) {
            throw new RepositoryError(
                "Error While getting Factories",
                `An error ocurred while getting factories`,
                (error as any)?.message ?? error
            );
        }
    }

    async getById(id: string): Promise<Factory> {
        const collection = mongoClient.db().collection(collections.factories);
        let doc: WithId<Document> | null = null;
        try {
            doc = await collection.findOne({
                _id: new ObjectId(id),
            });
        } catch (error) {
            throw new RepositoryError(
                "Error While getting Factory by Id",
                `An error ocurred while getting factory for id: ${id}`,
                (error as any)?.message ?? error
            );
        }

        if (doc) {
            const { _id, ...rest } = doc;
            return {
                id: _id.toString(),
                ...rest,
            } as Factory;
        }
        throw new ItemNotFoundError(
            "Factory Not Found",
            `Factory not found for id: ${id}`
        );
    }
}
