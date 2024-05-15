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
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.patch(`${this.path}/:id`, checkIsAuthenticated, validatorMiddleware(PostDto), this.updatePost);
        this.router.delete(`${this.path}/:id`, checkIsAuthenticated, this.deletePost);
    }

    private createPost = async (request: IRequestWithUser, response: Response, next: NextFunction) => {
        try {
            const {
                title,
                content
            }: IPost = request.body;

            console.log(request.user._id);

            const createdPost = await this.postService.createPost({
                user: request.user._id,
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

    private getPostById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;

            const post = await this.postService.getPostById(id);

            response
                .status(200)
                .json({
                    message: "Post found",
                    data: post
                });
        } catch (error) {
            next(error);
        }
    }
    
    private updatePost = async (request: IRequestWithUser, response: Response, next: NextFunction) => {
        try {
            const {
                title,
                content
            }: IPost = request.body;

            const {
                id
            } = request.params;

            const updatedPost = await this.postService.updatePost(id, {
                title,
                content
            });

            response
                .status(200)
                .json({
                    message: "Post updated",
                    data: updatedPost
                });
        } catch (error) {
            next(error);
        }
    }

    private deletePost = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;

            const deletedPost = await this.postService.deletePost(id);

            response
                .status(200)
                .json({
                    message: "Post deleted",
                    data: deletedPost
                });
        } catch (error) {
            next(error);
        }
    }
}

export {
    PostController
}