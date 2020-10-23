const express = require('express');

const googleclassController = require('../../controllers/googleclass.controller');

const router = express.Router();

router.get('/', googleclassController.googleClassJoin)
router.get('/redirect', googleclassController.googleClassConnect)

module.exports = router;