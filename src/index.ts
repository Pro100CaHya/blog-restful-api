import "dotenv/config";

import App from "@app/index";

import { MongoConfig } from "@config/index";
import { UserController } from "@src/users";
import { validateEnv } from "@utils/index";

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    MONGO_DB,
    MONGO_AUTH_SOURCE,
    PORT
} = validateEnv();

const mongoConfig = new MongoConfig(
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
    MONGO_DB,
    MONGO_AUTH_SOURCE
)

const app = new App(
    [
        new UserController()
    ],
    mongoConfig,
    PORT
);

app.startServer();