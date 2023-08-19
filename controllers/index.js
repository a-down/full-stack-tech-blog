const router = require('express').Router();
const apiRoutes = require('./api');
const { Post, User } = require('../models')

router.use('/api', apiRoutes);

router.use('/', async (req, res) => {
  try {
    let postData = await Post.findAll( {include: [{model: User}]} )
    const posts = postData.map((project) => project.get({plain: true}))
    console.log(posts)
    res.render('homepage', {posts})
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
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