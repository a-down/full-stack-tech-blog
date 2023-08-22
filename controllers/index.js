const router = require('express').Router();
const apiRoutes = require('./api');
const viewRoutes = require('./view-routes')
const writeRoutes = require('./write-routes')
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')

// API Routes
router.use('/api', apiRoutes);
router.use('/view', viewRoutes)
router.use('/write', writeRoutes)



// Dashboard Route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll( {where: {user_id: req.session.user_id}}, {include: [{model: User}]} )
    const posts = postData.map((project) => project.get({plain: true}))
    console.log(posts)

    res.render('dashboard', {posts: posts.reverse(), loggedIn: req.session.loggedIn})

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

// Login Page Route
router.get('/login', async (req, res) => res.render('login'))

// Home route
router.get('/', async (req, res) => {
  try {
    let postData = await Post.findAll( {include: [{model: User}]} )
    const posts = postData.map((project) => project.get({plain: true}))

    res.render('homepage', {posts: posts.reverse(), loggedIn: req.session.loggedIn})

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
 });

module.exports = router;
