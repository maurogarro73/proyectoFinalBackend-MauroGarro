import { UserModel } from '../DAO/models/users.model.js';
import { UserService } from '../services/users.service.js';
import { logger } from '../utils/logger.utils.js';

const userService = new UserService();

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(201).json({
        status: 'success',
        msg: 'Users list',
        payload: users,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async getUserId(req, res) {
    try {
      const uid = req.params.uid;
      const user = await userService.getUserId(uid);
      return res.status(201).json({
        status: 'success',
        msg: 'User',
        payload: user,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async updateUserPremium(req, res) {
    try {
      const uid = req.params.uid;
      const premiumData = req.body;
      await UserModel.updateOne({ _id: uid }, premiumData);
      const userUpdate = await UserModel.findById({ _id: uid });
      return res.status(201).json({
        status: 'success',
        msg: 'User Premium modified',
        payload: userUpdate,
      });
    } catch (error) {
      throw new Error();
    }
  }

  async deleteInactiveUsers(req, res) {
    try {
      const inactiveUsers = await userService.deleteInactiveUsers();
      return res.status(200).json({
        status: 'success',
        msg: 'Usuarios inactivos eliminados',
        payload: inactiveUsers,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'Error al eliminar los usuarios inactivos',
      });
    }
  }

  async delteUserById(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userService.delteUserById(userId);
      return res.status(200).json({
        status: 'success',
        msg: 'Usuario eliminado',
        payload: user,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        status: 'error',
        msg: 'Error al eliminar el usuario',
      });
    }
  }
}

export const userController = new UsersController();
