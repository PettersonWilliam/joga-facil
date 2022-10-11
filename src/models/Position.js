import Sequelize, { Model } from 'sequelize';

export default class Position extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    }, {
      sequelize,
      paranoid: true,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Participants, { foreignKey: 'position_id' });
  }
}
