import { Router, Request, Response, NextFunction } from "express";

import { IController } from "@interfaces/index";
import { validatorMiddleware } from "@middlewares/index";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import { UserDto } from "./user.dto";

class UserController implements IController {
    public path = "/users";
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/register`, validatorMiddleware(UserDto), this.registerUser);
        this.router.post(`${this.path}/login`, this.loginUser);
        this.router.patch(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    private registerUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {
                username,
                email,
                password
            }: IUser = request.body;

            const createdUser = await this.userService.registerUser({
                username,
                email,
                password
            });

            response
                .status(201)
                .json({
                    message: "User registered",
                    data: createdUser
                });
        } catch (error) {
            next(error);
        }
    }

    private loginUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const {
                email,
                password
            }: IUser = request.body;

            const jwtData = await this.userService.loginUser({
                email,
                password
            });

            response
                .status(200)
                .json({
                    message: "Authorization success",
                    data: jwtData
                });
        } catch (error) {
            next(error);
        }
    }

    private updateUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            const {
                username,
                email,
                password
            }: IUser = request.body;

            const updatedUser = await this.userService.updateUser(
                id,
                {
                    username,
                    email,
                    password
                }
            );

            response
                .status(200)
                .json({
                    message: "User updated",
                    data: updatedUser
                });
        } catch (error) {
            next(error);
        }
    }

    private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            const deletedUser = await this.userService.deleteUser(id);

            response
                .status(200)
                .json({
                    message: "User deleted",
                    data: deletedUser
                });
        } catch (error) {
            next(error)
        }
    }
}

export {
    UserController
}