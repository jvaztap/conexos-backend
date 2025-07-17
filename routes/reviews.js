/*
path: /reviews

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearReview, getReviews, deleteReviews } = require('../controllers/reviews');
const { validarReview } = require('../middlewares/validar_campos_reviews');

const router = Router();

// ✅ Obtener reseñas por evento
router.get('/:eventId', getReviews);

// ✅ Crear reseña con validaciones
router.post('/:eventId/create', [

  check('eventId', 'El campo *eventId* de Reviews es obligatorio.').isInt(),

  // ✅ Validar como float entre 1 y 5
  check('rating', 'El campo *rating* debe ser un número entre 1 y 5.')
    .isFloat({ min: 0, max: 5 }),

  check('comment', 'El campo *comment* de Reviews es obligatorio.').not().isEmpty(),

  validarReview

], crearReview);

// ✅ Eliminar reseñas por evento
router.delete('/:eventId', deleteReviews);

module.exports = router;
