'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    songUrl: DataTypes.STRING,
    albumPicUrl: DataTypes.STRING,
    songName: DataTypes.STRING,
    songGenre: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, { foreignKey: 'userId'});
    Song.belongsTo(models.Album, { foreignKey: 'albumId' });
  };
  return Song;
};
