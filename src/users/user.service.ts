import { UserRepository } from "./user.repository";
import { IUser } from "./user.interface";
import { createJwtToken, hashPassword, compareHashWithPassword, validateEnv } from "@utils/index";
import { HttpException } from "../exceptions";

class UserService {
    private userRepository = new UserRepository();

    public async registerUser(userData: IUser) {
        const userWithTheSameEmail = await this.userRepository.getUserByEmail(userData.email);

        if (userWithTheSameEmail) {
            throw new HttpException(
                400,
                `User with email ${userData.email} already exists`
            );
        }

        const {
            SALT_ROUNDS
        } = validateEnv();

        const hashedPassword = hashPassword(userData.password, SALT_ROUNDS);

        const createdUser = await this.userRepository.createUser({
            ...userData,
            password: hashedPassword
        });

        return {
            ...createdUser.toJSON()
        };
    }

    public async loginUser(userData: IUser) {
        const existedUser = await this.userRepository.getUserByEmail(userData.email);

        if (!existedUser) {
            throw new HttpException(
                404,
                `User with email ${userData.email} not found`
            );
        }

        const isPasswordCorrect = compareHashWithPassword(userData.password, existedUser.password);

        if (!isPasswordCorrect) {
            throw new HttpException(
                400,
                "Wrong password"
            );
        }

        const {
            JWT_SECRET
        } = validateEnv();

        const token = createJwtToken(
            {
                id: existedUser._id
            },
            60 * 60,
            JWT_SECRET
        );

        return {
            token,
            expires_in: 60 * 60
        };
    }

    public async updateUser(id: string, userData: IUser) {
        const userWithTheSameEmail = await this.userRepository.getUserByEmail(userData.email);

        if (userWithTheSameEmail && userWithTheSameEmail._id.toString() !== id) {
            throw new HttpException(
                400,
                `User with email ${userData.email} already exists`
            );
        }

        const updatedUser = await this.userRepository.updateUser(id, userData);

        if (!updatedUser) {
            throw new HttpException(
                404,
                `User with id ${id} not found`
            );
        }

        return updatedUser.toJSON();
    }

    public async deleteUser(id: string) {
        const deletedUser = await this.userRepository.deleteUser(id);

        if (!deletedUser) {
            throw new HttpException(
                404,
                `User with id ${id} not found`
            );
        }

        return deletedUser.toJSON();
    }
}

export {
    UserService
}