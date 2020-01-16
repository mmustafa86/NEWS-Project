'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  favorites.associate = function(models) {
    favorites.belongsTo(models.accounts, {
      as: 'account',
      foreignKey: 'user_id'
    })
  };
  return favorites;
};