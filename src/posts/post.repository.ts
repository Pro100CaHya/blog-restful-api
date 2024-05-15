import { IPost } from "./post.interface";
import { PostModel } from "./post.model";

class PostRepository {
    private post = PostModel;

    public async createPost(postData: IPost) {
        return this.post.create(postData);
    }

    public async getPostById(id: string) {
        return await this.post
            .findById(id)
            .populate("user", "-password -createdAt -updatedAt");
    }

    public async updatePost(id: string, postData: IPost) {
        return await this.post
            .findByIdAndUpdate(
                id,
                {
                    $set: {
                        updatedAt: new Date(),
                        ...postData,
                    }
                },
                {
                    new: true
                });
    }

    public async deletePost(id: string) {
        return await this.post
            .findByIdAndDelete(id);
    }
}

export {
    PostRepository
}