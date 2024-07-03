import { MongoClient } from "mongodb";

export const collections = {
    factories: "factories",
    sprockets: "sprockets",
};

const connectionUri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017`;

export const mongoClient = new MongoClient(connectionUri);
