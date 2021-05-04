'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artistPic: DataTypes.STRING,
    artistName: DataTypes.STRING,
    albumBio: DataTypes.TEXT
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
    Artist.hasMany(models.Album, {foreignKey: 'albumId'});
  };
  return Artist;
};
