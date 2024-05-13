import { Response, NextFunction, RequestHandler } from "express";
import { verify } from "jsonwebtoken";

import { HttpException } from "@exceptions/index";
import { validateEnv } from "@utils/index";
import { IJwtPayload, IRequestWithUser } from "@interfaces/index";
import { UserModel } from "@src/users/index";

async function checkIsAuthenticated(request: IRequestWithUser, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    const jwtToken = authorization?.split(" ");

    if (jwtToken && jwtToken[1]) {
        try {
            const {
                JWT_SECRET
            } = validateEnv();

            const verificationResponse = verify(jwtToken[1], JWT_SECRET) as IJwtPayload;

            const id = verificationResponse.id;

            const user = await UserModel.findById(id);

            if (user) {
                request.user = user;
                next();
            } else {
                next(
                    new HttpException(
                        401,
                        "Wrong authentication token"
                    )
                )
            }
        } catch (error) {
            next(
                new HttpException(
                    401,
                    "Wrong authentication token"
                )
            );
        }
    } else {
        next(
            new HttpException(
                401,
                "Unauthorized"
            )
        );
    }
}

export {
    checkIsAuthenticated
}