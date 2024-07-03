import { MongoClient, ObjectId } from "mongodb";
import { collections } from "./config";
import { MongoMemoryServer } from "mongodb-memory-server";
import { SPROCKETS } from "../../__tests__/seed_data/sprockets";
import { SprocketRepository } from "./SprocketRepository";
import { ItemNotFoundError } from "../error";
import { Sprocket, SprocketData } from "../../types/sprockets";

beforeAll(async () => {
    const config = require("./config");
    const server = await MongoMemoryServer.create();
    const mongoClient = new MongoClient(server.getUri());
    config.mongoClient = mongoClient;

    const seedData = SPROCKETS.map(({ id, ...rest }) => ({
        _id: new ObjectId(id),
        ...rest,
    }));

    await mongoClient
        .db()
        .collection(collections.sprockets)
        .insertMany(seedData);
});

describe("SprocketRepository tests", () => {
    const sprocketRepository = new SprocketRepository();

    it("should retrieve a sprocket by ID", async () => {
        const sprocket = await sprocketRepository.getById(SPROCKETS[0].id);
        expect(sprocket).toEqual(SPROCKETS[0]);
    });

    it("should throw an error when trying to retrieve non existing sprocket", async () => {
        const nonExistingId = "15a5d1741b7d26fb9837167e";
        expect.assertions(1);
        try {
            await sprocketRepository.getById(nonExistingId);
        } catch (error) {
            const expectedError = new ItemNotFoundError(
                "Sprocket Not Found",
                `Sprocket not found for id: ${nonExistingId}`
            );
            expect(error).toEqual(expectedError);
        }
    });

    it("should create a sprocket", async () => {
        const sprocketData: SprocketData = {
            outside_diameter: 1,
            pitch: 2,
            pitch_diameter: 3,
            teeth: 4,
        };
        const createdSprocket = await sprocketRepository.createSprocket(
            sprocketData
        );

        expect(createdSprocket).toEqual({
            id: createdSprocket.id,
            ...sprocketData,
        } as Sprocket);

        const dbSprocket = await sprocketRepository.getById(createdSprocket.id);
        expect(dbSprocket).toEqual({
            id: createdSprocket.id,
            ...sprocketData,
        } as Sprocket);
    });

    it("should update a sprocket", async () => {
        const updatedSprocketData: SprocketData = {
            outside_diameter: 4,
            pitch: 5,
            pitch_diameter: 6,
            teeth: 7,
        };

        await sprocketRepository.updateSprocket(
            SPROCKETS[0].id,
            updatedSprocketData
        );

        const dbSprocket = await sprocketRepository.getById(SPROCKETS[0].id);
        expect(dbSprocket).toEqual({
            id: SPROCKETS[0].id,
            ...updatedSprocketData,
        } as Sprocket);
    });

    it("should throw an error when trying to update non existing sprocket", async () => {
        const nonExistingId = "15a5d1741b7d26fb9837167e";
        expect.assertions(1);
        try {
            await sprocketRepository.updateSprocket(nonExistingId, {
                outside_diameter: 0,
                pitch: 1,
                pitch_diameter: 2,
                teeth: 3,
            });
        } catch (error) {
            const expectedError = new ItemNotFoundError(
                "Sprocket Not Found",
                `Sprocket not found for id: ${nonExistingId}`
            );
            expect(error).toEqual(expectedError);
        }
    });
});
