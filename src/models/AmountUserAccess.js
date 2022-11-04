import Sequelize, { Model } from "sequelize";

export default class AmountUserAccess extends Model {
  static init(sequelize) {
    return super.init(
    {
        status: {
          type: Sequelize.STRING,
        },
    },
      {
        sequelize,
      }
    ); 
        return this;
    },

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id"});
    }
  }