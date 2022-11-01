module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'is_blocked',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

    );
  },

   down(queryInterface) {
    return queryInterface.removeColumn(
      'users',
      'is_blocked',
    );
  }
};
