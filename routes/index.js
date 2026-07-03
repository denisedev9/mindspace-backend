const router = require('express').Router();
const usersRouter = require('./users');
const moodsRouter = require('./moods');

router.use('/users', usersRouter);
router.use('/moods', moodsRouter);

module.exports = router;
