
const Version = require('../models/version');

const getVersion = async (req, res) => {
  try {
    await Version.sync();
    const version = await Version.findOne();
    res.json({ version: version ? version.version : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la versión' });
  }
};

module.exports = {
  getVersion
};
