import { UserModel } from '../models/users.model.js';

export class UserClass {
  async getAllUsers() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      throw new Error();
    }
  }

  async getUserId(uid) {
    try {
      const user = await UserModel.findById(uid);
      return user;
    } catch (error) {
      throw new Error();
    }
  }

  async delteUserById(uid) {
    try {
      const userDeleted = await UserModel.deleteOne({ _id: uid });
      return userDeleted;
    } catch (error) {
      throw new Error();
    }
  }
}
