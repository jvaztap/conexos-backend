
const express = require('express');
const { getVersion } = require('../controllers/versionController');
const router = express.Router();

router.get('/version', getVersion);

module.exports = router;
