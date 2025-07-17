const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearEvento,
  getEventos,
  deleteEventos,
  subscribeToEvent,
  unsubscribeFromEvent
} = require('../controllers/events');

const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

// 🟢 Obtener todos los eventos
router.get('/', getEventos);

// 🆕 Crear nuevo evento
router.post('/new', [
  check('title', 'El campo *title* del evento es obligatorio.').not().isEmpty(),
  check('description', 'El campo *description* del evento es obligatorio.').not().isEmpty(),
  check('imageUrl', 'El campo *imageUrl* del evento es obligatorio.').isURL(),
  check('date', 'El campo *date* del evento es obligatorio.').isDate(),
  check('startTime', 'El campo *startTime* del evento es obligatorio.').not().isEmpty(),
  check('endTime', 'El campo *endTime* del evento es obligatorio.').not().isEmpty(),
  check('location', 'El campo *location* del evento es obligatorio.').not().isEmpty(),
  check('capacity', 'El campo *capacity* del evento es obligatorio.').not().isEmpty(),
  check('categories', 'El campo *categories* del evento es obligatorio. (List)').not().isEmpty(),
  validarCampos,
], crearEvento);

// ❌ Eliminar evento
router.delete('/:id', deleteEventos);

// 📥 Suscribirse a evento
router.post('/:id/subscribe', subscribeToEvent);

// 📤 Cancelar suscripción
router.post('/:id/unsubscribe', unsubscribeFromEvent);

module.exports = router;
