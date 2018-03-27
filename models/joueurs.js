'use strict';
var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  var Joueurs = sequelize.define('Joueurs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateNaissance: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('dateNaissance')).format('DD/MM/YYYY')
      }
    },
    dateInscription: {
      type: DataTypes.DATE,
      get: function() {
        return moment.utc(this.getDataValue('dateInscription')).format('DD/MM/YYYY H:mm:ss')
      }
    },
    credit: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: '0'
    },
    mail: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "Email non fournis"
    },
    pseudo: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {});
  Joueurs.associate = function(models) {
    // associations can be defined here
  };
  return Joueurs;
};