import { UserModel } from "./user.model";
import { IUser } from "./user.interface";

class UserRepository {
    private user = UserModel;

    public async createUser(userData: IUser) {
        return await this.user.create(userData);;
    }

    public async getUserByEmail(userEmail: string) {
        return await this.user.findOne({ email: userEmail });
    }

    public async getUserById(id: string) {
        return await this.user.findById(id);
    }

    public async updateUser(id: string, userData: IUser) {
        return await this.user.findByIdAndUpdate(id,
            {
                $set: {
                    updatedAt: new Date(),
                    ...userData,
                }
            },
            {
                new: true
            }
        );
    }

    public async deleteUser(id: string) {
        return await this.user.findByIdAndDelete(id);
    }
}

export {
    UserRepository
}