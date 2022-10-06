import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    }, {
      sequelize,
      paranoid: true,
      hooks: {
        beforeCreate: async (user, options) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 6);
          }
        }
      }
    });

    return this;
  }
}
