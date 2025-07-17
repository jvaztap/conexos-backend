const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Version = sequelize.define('Version', {
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  timestamps: false // ⏱ Se coloca aquí, no dentro del campo
});

module.exports = Version;
