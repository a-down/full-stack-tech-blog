const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')


// write new blog
router.use('/', async (req, res) => res.render('write-post', {userId: req.session.user_id}))


// update blog post
router.use('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)
    const post = postData.get({plain: true})
    res.render('update-post', {post: post, userId: req.session.user_id, postId: req.params.id})
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;