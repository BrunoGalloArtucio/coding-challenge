import { MongoClient, ObjectId } from "mongodb";
import { collections, mongoClient } from "./config";
import { MongoMemoryServer } from "mongodb-memory-server";
import { FACTORIES } from "../../__tests__/seed_data/factories";
import { FactoryRepository } from "./FactoryRepository";
import { ItemNotFoundError } from "../error";

beforeAll(async () => {
    const config = require("./config");
    const server = await MongoMemoryServer.create();
    const mongoClient = new MongoClient(server.getUri());
    config.mongoClient = mongoClient;

    const seedData = FACTORIES.map(({ id, ...rest }) => ({
        _id: new ObjectId(id),
        ...rest,
    }));

    await mongoClient
        .db()
        .collection(collections.factories)
        .insertMany(seedData);
});

describe("FactoryRepository tests", () => {
    const factoryRepository = new FactoryRepository();

    it("should retrieve all factories", async () => {
        const factories = await factoryRepository.getAll();
        expect(factories.length).toBe(FACTORIES.length);
        for (const FACTORY of FACTORIES) {
            expect(factories).toContainEqual(FACTORY);
        }
    });

    it("should retrieve a factory by ID", async () => {
        const factory = await factoryRepository.getById(FACTORIES[0].id);
        expect(factory).toEqual(FACTORIES[0]);
    });

    it("should throw an error when trying to retrieve non existing factory", async () => {
        const nonExistingId = "15a5d1741b7d26fb9837167e";
        expect.assertions(1);
        try {
            await factoryRepository.getById(nonExistingId);
        } catch (error) {
            const expectedError = new ItemNotFoundError(
                "Factory Not Found",
                `Factory not found for id: ${nonExistingId}`
            );
            expect(error).toEqual(expectedError);
        }
    });
});
