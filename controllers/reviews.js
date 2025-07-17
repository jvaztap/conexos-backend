const { response } = require('express');
const Review = require('../models/review');
const { sequelize } = require('../models');

const crearReview = async (req, res = response) => {
  try {
    const { eventId, rating, comment } = req.body;

    await sequelize.authenticate();
    await Review.sync();

    const nuevoReview = await Review.create({ eventId, rating, comment });

    res.status(201).json({
      ok: true,
      msg: 'Review creada exitosamente',
      review: nuevoReview
    });

  } catch (error) {
    console.error('Error al crear review:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear review',
      error: error.message
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json({ ok: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al obtener reviews desde la base de datos' });
  }
};

const deleteReviews = async (req, res = response) => {
  const { eventId } = req.params;

  try {
    const reseñas = await Review.findAll({ where: { eventId } });

    if (reseñas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reseñas para eliminar.' });
    }

    for (const r of reseñas) {
      await r.destroy();
    }

    const remainingReviews = await Review.findAll({ where: { eventId } });

    res.status(200).json({
      message: 'Reseñas eliminadas correctamente.',
      remainingReviews
    });

  } catch (error) {
    console.error('Error eliminando reseñas:', error);
    res.status(500).json({
      message: 'Error al eliminar las reseñas.',
      error: error.message || error
    });
  }
};

module.exports = {
  crearReview,
  getReviews,
  deleteReviews
};
