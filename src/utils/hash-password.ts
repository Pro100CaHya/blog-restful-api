import { hashSync } from "bcrypt";

function hashPassword(password: string, saltRounds: number) {
    return hashSync(password, saltRounds);
}

export {
    hashPassword
}