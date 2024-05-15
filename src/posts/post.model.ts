import mongoose from "mongoose";

import { IPost } from "./post.interface";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        user: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model<IPost & mongoose.Document>("Post", PostSchema);

export {
    PostModel
}