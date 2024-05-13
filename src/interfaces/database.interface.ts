interface IDatabase {
    user: string;
    password: string;
    host: string;
    database: string;
    authSource?: string;
    connect: () => Promise<void>;
}

export {
    IDatabase
}