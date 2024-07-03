// src/server.ts
import { buildApp } from "./app";

const port = process.env.PORT || 8081;

const app = buildApp();

app.listen(port, () =>
    console.log(`Api listening at http://localhost:${port}`)
);
