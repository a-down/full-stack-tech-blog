const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/login', loginRoutes)

module.exports = router;
