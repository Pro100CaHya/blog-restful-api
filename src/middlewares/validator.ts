import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { HttpException } from "@exceptions/index";

function validatorMiddleware(dto: any, skipMissingProperties = false) {
    return function(request: Request, response: Response, next: NextFunction) {
        console.log("Validator middleware...");
        validate(plainToInstance(dto, request.body), {
            skipMissingProperties
        })
            .then((errors: any) => {
                if (errors.length > 0) {
                    const errorMessage = errors.map((error: any) => {
                        return Object.values(error.constraints)
                    }).join(", ");

                    next(new HttpException(
                        400,
                        errorMessage
                    ));
                } else {
                    next();
                }
            })
    }
}

export {
    validatorMiddleware
}