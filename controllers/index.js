const router = require('express').Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth.js')
const { Post, User } = require('../models')


// API Routes
router.use('/api', apiRoutes);


// Dashboard Route
router.use('/dashboard', withAuth, async (req, res) => {
try {
  let postData = await Post.findAll( {where: {id: req.session.user_id}}, {include: [{model: User}]} )
  const posts = postData.map((project) => project.get({plain: true}))
  console.log(posts)

  res.render('dashboard', {posts, loggedIn: req.session.loggedIn})

} catch (err) {
  res.status(500).json(err)
  console.log(err)
}
});


// Login Page Route
router.get('/login', async (req, res) => res.render('login'))

router.get('/profile/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {include: [{model: Project}]} ).catch((err) => res.status(500).json(err))
  const serialized = user.get({plain: true})
  res.render('profile', {user: serialized})
})


// All other routes lead to homepage
router.use('/*', async (req, res) => {
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

module.exports = router;
