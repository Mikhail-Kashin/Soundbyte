'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    artistId: DataTypes.INTEGER,
    albumPic: DataTypes.STRING,
    albumName: DataTypes.STRING,
    albumDescription: DataTypes.TEXT
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};