import { Controller, Get, Path, Route, Tags } from "tsoa";
import { getFactories, getFactoryById } from "./services";
import { Factory } from "../types/sprockets";
import { IFactoryRepository } from "../repository/IRepository";
import { FactoryRepository } from "../repository/mongodb/FactoryRepository";

@Route("factories")
@Tags("Factory")
export class FactoriesController extends Controller {
    private _repo: IFactoryRepository;

    constructor() {
        super();
        this._repo = new FactoryRepository();
    }

    @Get("/")
    public async getFactories(): Promise<Factory[]> {
        const factories = await getFactories(this._repo);
        return factories;
    }

    @Get("/{factoryId}")
    public async getFactory(@Path() factoryId: string): Promise<Factory> {
        const factory = await getFactoryById(this._repo, factoryId);
        return factory;
    }
}
