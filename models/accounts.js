'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};