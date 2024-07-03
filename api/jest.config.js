/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "/node_modules/",
        "dist/",
        "helpers/",
        "seed_data/",
        "__tests__/setup.ts",
    ],
};
