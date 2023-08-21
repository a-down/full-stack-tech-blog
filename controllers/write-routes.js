const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')


// write new blog
router.get('/', async (req, res) => res.render('write-post', {userId: req.session.user_id, loggedIn: req.session.loggedIn}))


// update blog post
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)
    const post = postData.get({plain: true})
    res.render('write-post', {post: post, userId: req.session.user_id, postId: req.params.id})
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;