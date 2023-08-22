const router = require('express').Router();
const { Post, User, Comment } = require('../models')


// View Blog Route
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {include: [{model: User}]})

    if (!postData) {
      res.status(404).json({message: 'No post with this id'})
      return
    }

    const blogPost = postData.get({plain: true})

    const commentData = await Comment.findAll({where: {post_id: req.params.id}, include: {model: User}})
    const comments = commentData.map((comment) => comment.get({plain: true}))

    res.render('blog-post', {post: blogPost, comments: comments.reverse(), loggedIn: req.session.loggedIn})
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;