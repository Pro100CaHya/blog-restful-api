import {
    cleanEnv,
    str,
    port,
    num
} from "envalid";

function validateEnv() {
    return cleanEnv(
        process.env,
        {
            MONGO_PASSWORD: str(),
            MONGO_PATH: str(),
            MONGO_USER: str(),
            MONGO_DB: str(),
            MONGO_AUTH_SOURCE: str(),
            PORT: port(),
            JWT_SECRET: str(),
            SALT_ROUNDS: num()
        }
    );
}

export {
    validateEnv
}