import mongoose from "mongoose";

import { IDatabase } from "@interfaces/index";

class MongoConfig implements IDatabase {
    public user: string;
    public password: string;
    public host: string;
    public database: string;
    public authSource?: string;

    constructor(user: string, password: string, host: string, database: string, authSource: string) {
        this.user = user;
        this.password = password;
        this.host = host;
        this.database = database;
        this.authSource = authSource;
    }

    public async connect() {
        try {
            await mongoose.connect(`mongodb://${this.user}:${this.password}${this.host}/${this.database}?authSource=${this.authSource}`);   
        } catch (error) {
            throw error;
        }
    }
}

export {
    MongoConfig
}