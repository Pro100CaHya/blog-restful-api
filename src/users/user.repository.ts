import { UserModel } from "./user.model";
import { IUser } from "./user.interface";

class UserRepository {
    private user = UserModel;

    public async createUser(userData: IUser) {
        try {
            return await this.user.create(userData);;
        } catch (error) {
            throw error;
        }
    }

    public async getUserByEmail(userEmail: string) {
        try {
            return await this.user.findOne({ email: userEmail });
        } catch (error) {
            throw error;
        }
    }

    public async getUserById(id: string) {
        try {
            return await this.user.findById(id);
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(id: string, userData: IUser) {
        try {
            return await this.user.findByIdAndUpdate(id, userData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(id: string) {
        try {
            return await this.user.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

export {
    UserRepository
}