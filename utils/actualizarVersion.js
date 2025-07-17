// utils/actualizarVersion.js
const Version = require('../models/version');

const actualizarVersion = async () => {
  try {
    await Version.sync();

    const versionRow = await Version.findOne();
    if (versionRow) {
      versionRow.value += 1;
      await versionRow.save();
    } else {
      await Version.create({ value: 1 });
    }
  } catch (error) {
    console.error('Error al actualizar la versión:', error);
  }
};

module.exports = {
  actualizarVersion
};
