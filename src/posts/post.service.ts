import { PostRepository } from "./post.repository";
import { IPost } from "./post.interface";

class PostService {
    private PostRepository = new PostRepository();

    public async createPost(postData: IPost) {
        const createdPost = await this.PostRepository.createPost(postData);

        return createdPost;
    }
}

export {
    PostService
}