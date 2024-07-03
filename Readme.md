# Powerflex Coding Challenge

# Installation

## Pre-Requirements

1. Download and Install [Docker Desktop](https://www.docker.com/products/docker-desktop). Docker Desktop includes Docker Compose along with Docker Engine and Docker CLI which are Compose prerequisites.

## Setting up

1. Clone repository
2. Cd into the `api` and install dependencies with command `npm install`
3. Create file `api/.env` file and add values for `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`. Example of `.env` file content:

```
MONGO_INITDB_ROOT_USERNAME=MyUser
MONGO_INITDB_ROOT_PASSWORD=MyPassword
```

This file's variables will be used by docker-compose and our API for MongoDB database authentication.



# Running tests

Tests are executed with the command `npm run test`.
Repository tests use the library [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server). This package spins up an actual/real MongoDB server programmatically from within nodejs, for testing or mocking during development.
