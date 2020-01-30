'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    g_id: DataTypes.TEXT
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
    accounts.hasMany(models.favorites, {
      as: 'favorites',
      foreignKey: 'user_id'
    });
  };
  return accounts;
};