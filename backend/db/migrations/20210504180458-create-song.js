'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {model: 'Albums'}
      },
      songUrl: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true
      },
      albumPicUrl: {
        type: Sequelize.STRING(500),
        allowNull: true,
        unique: true
      },
      songName: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      songGenre: {
        type: Sequelize.STRING(250)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
