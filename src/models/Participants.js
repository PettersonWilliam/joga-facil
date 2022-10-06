import Sequelize, { Model } from 'sequelize';

export default class Participants  extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING
      },
      born: {
        type: Sequelize.DATEONLY
      },
      number: {
        type: Sequelize.INTEGER
      },
      position_id: {
        type: Sequelize.INTEGER
      },
    }, {
      sequelize,
      paranoid: true,
    });
  }

  static associate(models) {
    this.hasMany(models.Position, { foreignKey: 'position_id' });
  };
}
