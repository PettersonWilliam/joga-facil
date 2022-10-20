import Sequelize, { Model } from "sequelize";

export default class Participants extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        born: {
          type: Sequelize.DATEONLY,
        },
        number: {
          type: Sequelize.INTEGER,
        }
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        sequelize: sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Position, { foreignKey: "position_id" });
    this.belongsToMany(models.Matchs, { through: models.MatchsParticipants, foreignKey: "match_id", as: "matches", otherKey: "participant_id" });
  }
}
