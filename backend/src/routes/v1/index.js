const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const generatePDF = require('./generatePDF.route');

const router = express.Router();


router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/pdf', generatePDF);



module.exports = router;
