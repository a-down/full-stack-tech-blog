const router = require('express').Router();
const apiRoutes = require('./api');
const { Project, User } = require('../models')

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  const projects = await Project.findAll( {include: [{model: User}]} ).catch((err) => res.status(500).json(err))
  const serialized = projects.map((project) => project.get({plain: true}))
  res.render('homepage', { projects: serialized })
});

router.get('/project/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, {include: [{model: User}]} ).catch((err) => res.status(500).json(err))
  const serialized = project.get({plain: true})
  res.render('project', { project: serialized })
});

router.get('/login', async (req, res) => res.render('login'))

router.get('/profile/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {include: [{model: Project}]} ).catch((err) => res.status(500).json(err))
  const serialized = user.get({plain: true})
  res.render('profile', {user: serialized})
})

module.exports = router;
