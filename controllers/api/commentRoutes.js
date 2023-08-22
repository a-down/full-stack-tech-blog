const router = require('express').Router();
const { Comment } = require('../../models');


// POST NEW COMMENT
router.post('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(500).json('Please log in to leave a comment.')
    return
  }

  try {
  const comment = await Comment.create({
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.session.user_id
  })

  res.status(200).json({message: 'Comment created'})
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;
