import mongoose from "mongoose";

import { IUser } from "./user.interface";

const UserSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    },
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export {
    UserModel
}