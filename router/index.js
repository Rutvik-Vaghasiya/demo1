const express = require('express');
const router = express.Router();



router.use('/',require('./api/users/index'));

router.use('/api/users',require('./api/users'));

// router.use('/api/update',require('./api/users'))



module.exports = router;