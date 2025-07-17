const { response } = require('express');
const { event, sequelize } = require('../models/event');
const { incrementVersion } = require('../utils/versionUtils'); // 👈 Importa la función

// Crear evento
const crearEvento = async (req, res = response) => {
  try {
    await sequelize.authenticate();
    await event.sync();

    const nuevoEvento = await event.create(req.body);
    // El hook beforeCreate establece spotsLeft = capacity
    // Los hooks afterCreate ya se encargan de incrementar la versión

    res.status(201).json({
      ok: true,
      msg: 'Evento creado exitosamente',
      evento: nuevoEvento
    });
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el evento',
      error: error.message
    });
  }
};

// Obtener todos los eventos
const getEventos = async (req, res) => {
  try {
    const eventos = await event.findAll();
    res.json({ ok: true, eventos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al obtener los eventos desde la base de datos' });
  }
};

// Eliminar evento
const deleteEventos = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await event.findByPk(id);

    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado o ya ha sido eliminado.' });
    }

    await evento.destroy(); // El hook afterDestroy maneja la versión

    const remainingEvents = await event.findAll();
    res.status(200).json({
      message: 'Evento eliminado exitosamente.',
      remainingEvents
    });
  } catch (error) {
    console.error('Error eliminando el evento:', error);
    res.status(500).json({ message: 'Error al eliminar el evento.', error: error.message || error });
  }
};

// Actualizar evento
const actualizarEvento = async (req, res = response) => {
  const { id } = req.params;
  try {
    const evento = await event.findByPk(id);
    if (!evento) {
      return res.status(404).json({ msg: 'Evento no encontrado.' });
    }

    Object.assign(evento, req.body);
    await evento.save(); // El hook afterUpdate maneja la versión

    res.status(200).json({
      ok: true,
      msg: 'Evento actualizado correctamente.',
      evento
    });
  } catch (error) {
    console.error('Error actualizando el evento:', error);
    res.status(500).json({ ok: false, msg: 'Error al actualizar el evento', error: error.message });
  }
};

// Suscribirse a un evento
const subscribeToEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await event.findByPk(id);
    if (!evento) {
      return res.status(404).json({ msg: 'Evento no encontrado.' });
    }

    if (evento.spotsLeft <= 0) {
      return res.status(400).json({ msg: 'No hay cupos disponibles para este evento.' });
    }

    evento.spotsLeft = Math.max(0, evento.spotsLeft - 1);
    await evento.save();

    await incrementVersion(); 

    res.status(200).json({
      ok: true,
      msg: 'Suscripción confirmada.',
      evento
    });
  } catch (error) {
    console.error('Error al suscribirse al evento:', error);
    res.status(500).json({ msg: 'Error al suscribirse al evento.', error: error.message });
  }
};

// Cancelar suscripción al evento
const unsubscribeFromEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await event.findByPk(id);
    if (!evento) {
      return res.status(404).json({ msg: 'Evento no encontrado.' });
    }

    evento.spotsLeft = Math.min(evento.spotsLeft + 1, evento.capacity);
    await evento.save();

    await incrementVersion(); 

    res.status(200).json({
      ok: true,
      msg: 'Suscripción cancelada.',
      evento
    });
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ msg: 'Error al cancelar suscripción.', error: error.message });
  }
};

module.exports = {
  crearEvento,
  getEventos,
  deleteEventos,
  actualizarEvento,
  subscribeToEvent,
  unsubscribeFromEvent,
};

