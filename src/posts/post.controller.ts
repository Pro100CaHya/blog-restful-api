import { Router, Request, Response, NextFunction } from "express";
import { IPost } from "./post.interface";
import { PostService } from "./post.service";
import { PostDto } from "./post.dto";

import { validatorMiddleware } from "@middlewares/index";
import { IRequestWithUser } from "@interfaces/index";
import { checkIsAuthenticated } from "@middlewares/index";

class PostController {
    public path = "/posts";
    public router = Router();
    private postService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(this.path, checkIsAuthenticated, validatorMiddleware(PostDto), this.createPost);
    }

    private createPost = async (request: IRequestWithUser, response: Response, next: NextFunction) => {
        try {
            const {
                userId,
                title,
                content
            }: IPost = request.body;

            const createdPost = await this.postService.createPost({
                userId,
                title,
                content
            });

            response
                .status(201)
                .json({
                    message: "Post created",
                    data: createdPost
                });
        } catch (error) {
            next(error);
        }
    }
}

export {
    PostController
}