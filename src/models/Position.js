import Sequelize, { Model } from "sequelize";

export default class Position extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        }
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        sequelize: sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Participants, { foreignKey: "position_id" });
  }
}
