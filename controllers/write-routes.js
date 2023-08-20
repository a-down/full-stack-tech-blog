const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')


// write new blog
router.use('/', async (req, res) => res.render('write-post', {userId: req.session.user_id}))


// update blog post
router.use('/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id)
  const post = postData.get({plain: true})
  res.render('write-post', {post, userId: req.session.user_id})
})

module.exports = router;