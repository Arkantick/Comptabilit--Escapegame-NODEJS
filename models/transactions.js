'use strict';
var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var Transactions = sequelize.define('Transactions', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    joueur: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "joueurs",
            key: "id"
        }
    },
    valeur: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        get: function() {
          return moment.utc(this.getDataValue('date')).format('DD/MM/YYYY H:mm:ss')
        }
    }
  }, {});
  //Transactions.hasMany(Joueurs);
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};