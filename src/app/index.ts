import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { IController, IDatabase } from "@interfaces/index";
import { errorMiddleware } from "@middlewares/index";

class App {
    private readonly app: express.Application;
    private readonly database: IDatabase;
    private readonly port: number;

    constructor(controllers: IController[], database: IDatabase, port: number = 8000) {
        this.app = express();
        this.port = port;
        this.database = database;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private async connectToTheDatabase() {
        try {
            console.log(`Try to connect to the database...`);

            await this.database.connect();

            console.log(`Database connected`);
        } catch (error) {
            console.error("Error connecting to the database:", error);
            process.exit(1); // Exit the process if connection fails;
        }
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`);
        });
    }

    public async startServer() {
        await this.connectToTheDatabase()

        this.listen();
    }
}

export default App;
