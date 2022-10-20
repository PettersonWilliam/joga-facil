import Sequelize, { Model } from "sequelize";

export default class Position extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        sequelize: sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Participants, { foreignKey: "position_id" });
  }
}
