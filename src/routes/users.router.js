import express from 'express';
import { userController } from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);
usersRouter.delete('/', userController.deleteInactiveUsers);
usersRouter.get('/premium/:uid', userController.getUserId);
usersRouter.put('/premium/:uid', userController.updateUserPremium);
usersRouter.post('/:uid/documents', userController.getUserId);
usersRouter.delete('/:uid', userController.delteUserById);
