import { userDTO } from '../DAO/DTO/user.dto.js';
import { UserClass } from '../DAO/classes/users.class.js';
import { UserModel } from '../DAO/models/users.model.js';
import { transport } from '../utils.js';
import { logger } from '../utils/logger.utils.js';
const userClass = new UserClass();

export class UserService {
  async getAllUsers() {
    try {
      const users = await userClass.getAllUsers();
      const filteredUsers = users.map((user) => new userDTO(user));
      return filteredUsers;
    } catch (error) {
      throw new Error();
    }
  }

  async getUserId(uid) {
    try {
      const user = await userClass.getUserId(uid);
      return user;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteInactiveUsers() {
    try {
      const users = await userClass.getAllUsers();
      const inactiveUsers = users.filter((user) => {
        if (parseInt(Date.now()) > user.last_connection) {
          if (user.email !== process.env.ADMIN_EMAIL) {
            return true;
          }
        }
      });

      for (const user of inactiveUsers) {
        const email = user.email;

        const result = transport.sendMail({
          from: process.env.GOOGLE_EMAIL,
          to: email,
          subject: 'Cuenta dada de baja por inactividad',
          html: `
            <div>
              <p>Su cuenta fue dada de baja por tiempo de inactividad</p>
            </div>
          `,
        });

        if (result.status === 'rejected') {
          logger.error(`El correo electrónico a ${email} fue rechazado`);
        }
      }

      const inactiveUsersEmails = inactiveUsers.map((user) => user.email);
      await UserModel.deleteMany({ email: { $in: inactiveUsersEmails } });
      return inactiveUsers;
    } catch (error) {
      throw error;
    }
  }

  async delteUserById(uid) {
    try {
      const user = await userClass.getUserId(uid);
      const email = user.email;

      const result = transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: 'Usuario dado de baja',
        html: `
          <div>
            <p>Su cuenta fue dada de baja por el administrador del sitio</p>
          </div>
        `,
      });

      if (result.status === 'rejected') {
        logger.error(`El correo electrónico a ${email} fue rechazado`);
      }

      const userDeleted = await userClass.delteUserById(uid);
      return userDeleted;
    } catch (error) {
      throw new Error();
    }
  }
}
