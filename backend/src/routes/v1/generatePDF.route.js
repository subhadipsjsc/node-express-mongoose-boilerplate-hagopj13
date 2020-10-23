const express = require('express');

const generatePDFController = require('../../controllers/pdfdownload.controller');

const router = express.Router();

router.get('/download1', generatePDFController.download1)

module.exports = router;