const { DataTypes } = require('sequelize');
const { sequelize } = require('../models/event');
const { incrementVersion } = require('../utils/versionUtils');

const Review = sequelize.define('review', {
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Eventos',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true
});

// 🧠 Hooks para notificar cambios en reseñas
Review.afterCreate(async () => {
  await incrementVersion();
});

Review.afterUpdate(async () => {
  await incrementVersion();
});

Review.afterDestroy(async () => {
  await incrementVersion();
});

module.exports = Review;
