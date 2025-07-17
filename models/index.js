const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mariadb'
});

// Importar modelos
const Event = require('./event').event;
const Review = require('./review'); // si usas module.exports = Review
const VersionModel = require('./version');
const Version =  new VersionModel(sequelize);

// 🔗 Establecer asociaciones
Event.hasMany(Review, { foreignKey: 'eventId' });
Review.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
  sequelize,
  Event,
  Review,
  Version
};
