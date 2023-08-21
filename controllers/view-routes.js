const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User, Comment } = require('../models')

// View Blog Route
// /view/:id
router.get('/:id', async (req, res) => {
 
  // console.log(req.params.id)
  const postId = req.params.id

  const postData = await Post.findByPk(postId, {include: [{model: User}]})
  console.log(postData)

  if( !postData ) return res.send("Error!!!")

  const blogPost = postData.get({plain: true})
  // let post = []
  // post.push(blogPost)
  // console.log(post)
  console.log(blogPost)

  if( blogPost ){
    const commentData = await Comment.findAll({where: {post_id: postId}, include: {model: User}})
    // console.log(commentData)
    const comments = commentData.map((comment) => comment.get({plain: true}))
    console.log(comments)

    res.render('blog-post', {post: blogPost, comments, loggedIn: req.session.loggedIn})
  } else {
   
  }
})

function loadBlogPost(post, comments, res) {
  res.render('blog-post', {post, comments})
}

module.exports = router;