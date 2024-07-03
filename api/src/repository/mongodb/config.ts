import { MongoClient } from "mongodb";

export const collections = {
    factories: "factories",
    sprockets: "sprockets",
};

const connectionUri = "mongodb://BrunoGallo:Pa55W0RD@localhost:27017";

export const mongoClient = new MongoClient(connectionUri);
