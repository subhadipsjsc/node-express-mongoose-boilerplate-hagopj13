const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const googleclassRoute = require('./googleClassRoom.route');

const router = express.Router();


router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/googleclassroom', googleclassRoute);



module.exports = router;
