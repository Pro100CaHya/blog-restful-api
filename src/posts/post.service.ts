import { PostRepository } from "./post.repository";
import { IPost } from "./post.interface";
import { HttpException } from "../exceptions";

class PostService {
    private PostRepository = new PostRepository();

    public async createPost(postData: IPost) {
        return await this.PostRepository.createPost(postData);
    }

    public async getPostById(id: string) {
        const post = await this.PostRepository.getPostById(id);
        if (!post) {
            throw new HttpException(
                404,
                "Post not found"
            );
        }
        return post;
    }

    public async updatePost(id: string, postData: IPost) {
        const post = await this.PostRepository.updatePost(id, postData);
        if (!post) {
            throw new HttpException(
                404,
                "Post not found"
            );
        }
        return post;
    }

    public async deletePost(id: string) {
        const post = await this.PostRepository.deletePost(id);
        if (!post) {
            throw new HttpException(
                404,
                "Post not found"
            );
        }
        return post;
    }
}

export {
    PostService
}