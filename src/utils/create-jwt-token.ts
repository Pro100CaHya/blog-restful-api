import jwt from "jsonwebtoken"

import { IJwtPayload } from "@interfaces/index";

function createJwtToken(payload: IJwtPayload, expiresIn: number, secret: string) {
    return jwt.sign(
        payload,
        secret,
        {
            expiresIn
        }
    );
}

export {
    createJwtToken
}