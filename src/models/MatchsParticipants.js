import Sequelize, { Model } from 'sequelize';

export default class MatchsParticipants extends Model {
  static init(sequelize) {
    super.init({
      match_id: {
        type: Sequelize.INTEGER
      },
      participant_id: {
        type: Sequelize.INTEGER
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN
      },
      gols: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.INTEGER
      }
    }, {
      sequelize,
      paranoid: true,
    });

    return this;
  }
}
