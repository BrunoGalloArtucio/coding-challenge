import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Route,
    SuccessResponse,
    Tags,
} from "tsoa";
import { Sprocket, SprocketData } from "../types/sprockets";
import { createSprocket, getSprocketById, updateSprocket } from "./services";
import { SprocketRepository } from "../repository/mongodb/SprocketRepository";
import { ISprocketRepository } from "../repository/IRepository";

@Route("sprockets")
@Tags("Sprocket")
export class SprocketsController extends Controller {
    private _repo: ISprocketRepository;

    constructor() {
        super();
        this._repo = new SprocketRepository();
    }

    @Get("/{sprocketId}")
    public async getSprocket(@Path() sprocketId: string): Promise<Sprocket> {
        const sprocket = await getSprocketById(this._repo, sprocketId);
        return sprocket;
    }

    @Post("/")
    @SuccessResponse(201, "Created")
    public async createSprocket(
        @Body() sprocket: SprocketData
    ): Promise<Sprocket> {
        return await createSprocket(this._repo, sprocket);
    }

    @Put("/{sprocketId}")
    @SuccessResponse(204, "No Content")
    public async updateSprocket(
        @Path() sprocketId: string,
        @Body() sprocket: SprocketData
    ): Promise<void> {
        await updateSprocket(this._repo, sprocketId, sprocket);
    }
}
