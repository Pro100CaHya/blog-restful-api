import { IPost } from "./post.interface";
import { PostModel } from "./post.model";

class PostRepository {
    private post = PostModel;

    public async createPost(postData: IPost) {
        try {
            return await this.post.create(postData);
        } catch (error) {
            throw error;
        }
    }

    public async getPostById(id: string) {
        try {
            return await this.post.findById(id);
        } catch (error) {
            throw error;
        }
    }
}

export {
    PostRepository
}