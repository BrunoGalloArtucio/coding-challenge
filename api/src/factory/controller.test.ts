import { Express } from "express";
import request from "supertest";
import { FACTORIES } from "../__tests__/seed_data/factories";
import { buildApp } from "../app";
import { FactoryRepository } from "../repository/mongodb/FactoryRepository";
import { ItemNotFoundError } from "../repository/error";

let app: Express;

beforeAll(async () => {
    app = await buildApp();
});

describe("Get /factories", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it(`should return a list of factories`, async () => {
        jest.spyOn(FactoryRepository.prototype, "getAll").mockImplementation(
            () => Promise.resolve(FACTORIES)
        );

        const response = await request(app)
            .get(`/factories`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).toEqual(FACTORIES);
        expect(FactoryRepository.prototype.getAll).toHaveBeenCalledTimes(1);
    });
});

describe("Get /factories/{factoryId}", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it(`should return a specific factory`, async () => {
        jest.spyOn(FactoryRepository.prototype, "getById").mockImplementation(
            () => Promise.resolve(FACTORIES[0])
        );

        const factoryId = "abc";

        const response = await request(app)
            .get(`/factories/${factoryId}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).toEqual(FACTORIES[0]);
        expect(FactoryRepository.prototype.getById).toHaveBeenCalledTimes(1);
        expect(FactoryRepository.prototype.getById).toHaveBeenCalledWith(
            factoryId
        );
    });

    it(`should return 404 not found for non existing factory`, async () => {
        const factoryId = "def";

        const notFoundError = new ItemNotFoundError(
            "Factory Not Found",
            `Factory not found for id: ${factoryId}`
        );
        jest.spyOn(FactoryRepository.prototype, "getById").mockImplementation(
            () => Promise.reject(notFoundError)
        );

        await request(app)
            .get(`/factories/${factoryId}`)
            .set("Accept", "application/json")
            .expect(404);

        expect(FactoryRepository.prototype.getById).toHaveBeenCalledTimes(1);
        expect(FactoryRepository.prototype.getById).toHaveBeenCalledWith(
            factoryId
        );
    });
});
