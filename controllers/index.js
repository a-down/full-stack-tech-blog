const router = require('express').Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')


// API Routes
router.use('/api', apiRoutes);



// Blog Post Route
router.use('/:id', async (req, res) => {
    console.log(req.params.id)
    const postData = await Post.findByPk(req.params.id, {include: [{model: User}, {model: Comment}]})
    console.log(postData)
    const post = await postData.get({plain: true})
    console.log(post)

    const commentData = await Comment.findAll({where: {post_id: req.params.id}, include: {model: User}})
    console.log(commentData)
    const comments = commentData.map((comment) => comment.get({plain: true}))
    console.log(comments)
    res.render('post', {post, commentsData: comments})
})


// Dashboard Route
router.use('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll( {where: {user_id: req.session.user_id}}, {include: [{model: User}]} )
    const posts = postData.map((project) => project.get({plain: true}))
    console.log(posts)

    res.render('dashboard', {posts, loggedIn: req.session.loggedIn})

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});


// Login Page Route
router.use('/login', async (req, res) => res.render('login'))



// All other routes lead to homepage
router.use('/*', async (req, res) => {
  try {
    let postData = await Post.findAll( {include: [{model: User}]} )
    const posts = postData.map((project) => project.get({plain: true}))
    console.log(posts)
    res.render('homepage', {posts, loggedIn: req.session.loggedIn})

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
 });

module.exports = router;
