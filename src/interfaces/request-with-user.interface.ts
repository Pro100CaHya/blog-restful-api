import {
    Request
} from "express";

import { IUser } from "@src/users/index";

interface IRequestWithUser extends Request {
    user: IUser
}

export {
    IRequestWithUser
}