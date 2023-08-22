const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')

// View Blog Route
// /view/:id
router.get('/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {include: [{model: User}]})

  if (!postData) {
    res.status(404).json({message: 'No post with this id'})
    return
  }

  const blogPost = postData.get({plain: true})

  const commentData = await Comment.findAll({where: {post_id: req.params.id}, include: {model: User}})
  const comments = commentData.map((comment) => comment.get({plain: true}))
  console.log(comments)

  res.render('blog-post', {post: blogPost, comments: comments.reverse(), loggedIn: req.session.loggedIn})
})


module.exports = router;