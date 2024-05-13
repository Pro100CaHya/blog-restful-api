import { compareSync } from "bcrypt"

function compareHashWithPassword(plainPassword: string, hash: string) {
    return compareSync(plainPassword, hash);
}

export {
    compareHashWithPassword
}