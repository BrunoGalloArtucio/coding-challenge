import express, {
    json,
    urlencoded,
    Request,
    Response,
    NextFunction,
} from "express";
import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import { ApiError } from "./types/api";

export function buildApp() {
    const app = express();

    app.use(
        urlencoded({
            extended: true,
        })
    );
    app.use(json());
    const tenMinutesMs = 10 * 60 * 1000;
    // allow browsers to cache preflight requests. Chromium is the most restrictive
    // of the browsers at 10 minutes, maximum.
    app.use(cors({ maxAge: tenMinutesMs }));

    RegisterRoutes(app);

    const jsonErrorHandler = (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(err instanceof ApiError ? err.status : 500).send({
            error: err,
        });
    };

    app.use(jsonErrorHandler);

    return app;
}
