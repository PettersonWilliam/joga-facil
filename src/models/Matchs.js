import Sequelize, { Model } from "sequelize";

export default class Matchs extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: Sequelize.DATE,
        },
        status: {
          type: Sequelize.STRING,
        },
        started_at: {
          type: Sequelize.DATE,
        },
        end_at: {
          type: Sequelize.DATE,
        },
        team_amount: {
          type: Sequelize.INTEGER,
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
    this.belongsToMany(models.Participants, {
      through: models.MatchsParticipants,
      foreignKey: "participant_id",
      as: "participants",
      otherKey: "match_id",
    });
  }
}
