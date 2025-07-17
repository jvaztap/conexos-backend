const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const { incrementVersion } = require('../utils/versionUtils');
const sequelize = require('./sequelize');

const Evento = sequelize.define('Evento', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Evento de Conexos'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Nuevo evento de Conexos'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'https://www.conexos.cu/CONEXOS.png'
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  spotsLeft: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  timestamps: true,
});

// 🧠 Hook para inicializar `spotsLeft` = `capacity`
Evento.beforeCreate(async (evento, options) => {
  evento.spotsLeft = evento.capacity;
});

// 🚀 Hooks mágicos para actualizar versión cuando se modifica el evento
Evento.afterCreate(async () => {
  await incrementVersion();
});

Evento.afterUpdate(async () => {
  await incrementVersion();
});

Evento.afterDestroy(async () => {
  await incrementVersion();
});

module.exports = {
  event: Evento,
  sequelize
};
