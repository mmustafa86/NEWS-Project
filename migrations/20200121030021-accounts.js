'use strict';


  module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('accounts', 'g_id', Sequelize.TEXT)
          
        },
    
    down: function (queryInterface, _Sequelize) {
        return queryInterface.removeColumn('accounts', 'g_id')
          
        },
    };