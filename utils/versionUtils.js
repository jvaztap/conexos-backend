const Version = require('../models/version');

const incrementVersion = async () => {
  try {
    // 📌 Asegura que la tabla esté creada
    await Version.sync();

    let current = await Version.findOne();

    if (!current) {
      // 🟢 Crea versión inicial si no existe
      current = await Version.create({ version: 1 });
    } else {
      // 🔁 Incrementa la versión actual
      await current.increment('version');
    }
  } catch (error) {
    console.error('❌ Error al incrementar la versión:', error.message || error);
  }
};

module.exports = { incrementVersion };

