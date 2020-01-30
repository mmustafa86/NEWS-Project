'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    favorites.belongsTo(models.accounts, {
      as: 'account',
      foreignKey: 'user_id'
    })
  };
  return favorites;
};