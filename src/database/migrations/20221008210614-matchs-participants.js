module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matchs_participants', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      match_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matchs',
          key: 'id',
        }
      },
      participant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'participants',
          key: 'id',
        }
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      gols: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('matchs_participants');
  },
};
