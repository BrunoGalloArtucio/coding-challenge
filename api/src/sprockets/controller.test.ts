import { Express } from "express";
import request from "supertest";
import { SPROCKETS } from "../__tests__/seed_data/sprockets";
import { buildApp } from "../app";
import { SprocketRepository } from "../repository/mongodb/SprocketRepository";
import { ItemNotFoundError } from "../repository/error";
import { SprocketData } from "../types/sprockets";

let app: Express;

beforeAll(async () => {
    app = await buildApp();
});

describe("Get /sprockets/{sprocketId}", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it(`should return a specific sprocket`, async () => {
        jest.spyOn(SprocketRepository.prototype, "getById").mockImplementation(
            () => Promise.resolve(SPROCKETS[0])
        );

        const sprocketId = "abc";

        const response = await request(app)
            .get(`/sprockets/${sprocketId}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).toEqual(SPROCKETS[0]);
        expect(SprocketRepository.prototype.getById).toHaveBeenCalledTimes(1);
        expect(SprocketRepository.prototype.getById).toHaveBeenCalledWith(
            sprocketId
        );
    });

    it(`should return 404 not found for non existing sprocket`, async () => {
        const sprocketId = "def";

        const notFoundError = new ItemNotFoundError(
            "Sprocket Not Found",
            `Sprocket not found for id: ${sprocketId}`
        );
        jest.spyOn(SprocketRepository.prototype, "getById").mockImplementation(
            () => Promise.reject(notFoundError)
        );

        await request(app)
            .get(`/sprockets/${sprocketId}`)
            .set("Accept", "application/json")
            .expect(404);

        expect(SprocketRepository.prototype.getById).toHaveBeenCalledTimes(1);
        expect(SprocketRepository.prototype.getById).toHaveBeenCalledWith(
            sprocketId
        );
    });
});

describe("POST /sprockets", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it(`should create a sprocket`, async () => {
        const sprocketId = "abc";

        jest.spyOn(
            SprocketRepository.prototype,
            "createSprocket"
        ).mockImplementation((data: SprocketData) =>
            Promise.resolve({
                id: sprocketId,
                ...data,
            })
        );

        const createData: SprocketData = {
            outside_diameter: 4,
            pitch: 1,
            pitch_diameter: 23,
            teeth: 90,
        };

        const response = await request(app)
            .post(`/sprockets`)
            .send(createData)
            .set("Accept", "application/json")
            .expect(201);

        expect(response.body).toEqual({
            id: sprocketId,
            ...createData,
        });

        expect(
            SprocketRepository.prototype.createSprocket
        ).toHaveBeenCalledTimes(1);
        expect(
            SprocketRepository.prototype.createSprocket
        ).toHaveBeenCalledWith(createData);
    });
});

describe("PUT /sprockets/{sprocketId}", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it(`should update a specific sprocket`, async () => {
        jest.spyOn(
            SprocketRepository.prototype,
            "updateSprocket"
        ).mockImplementation(() => Promise.resolve());

        const sprocketId = "abc";

        const updateData: SprocketData = {
            outside_diameter: 4,
            pitch: 1,
            pitch_diameter: 23,
            teeth: 90,
        };

        await request(app)
            .put(`/sprockets/${sprocketId}`)
            .send(updateData)
            .set("Accept", "application/json")
            .expect(204);

        expect(
            SprocketRepository.prototype.updateSprocket
        ).toHaveBeenCalledTimes(1);
        expect(
            SprocketRepository.prototype.updateSprocket
        ).toHaveBeenCalledWith(sprocketId, updateData);
    });

    it(`should return 404 not found for non existing sprocket`, async () => {
        const sprocketId = "def";

        const notFoundError = new ItemNotFoundError(
            "Sprocket Not Found",
            `Sprocket not found for id: ${sprocketId}`
        );
        jest.spyOn(
            SprocketRepository.prototype,
            "updateSprocket"
        ).mockImplementation(() => Promise.reject(notFoundError));

        const updateData: SprocketData = {
            outside_diameter: 4,
            pitch: 1,
            pitch_diameter: 23,
            teeth: 90,
        };

        await request(app)
            .put(`/sprockets/${sprocketId}`)
            .send(updateData)
            .set("Accept", "application/json")
            .expect(404);

        expect(
            SprocketRepository.prototype.updateSprocket
        ).toHaveBeenCalledTimes(1);
        expect(
            SprocketRepository.prototype.updateSprocket
        ).toHaveBeenCalledWith(sprocketId, updateData);
    });
});
