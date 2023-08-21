const router = require('express').Router();
const { Post } = require('../../models');


// get all posts
router.get('/', async (req, res) => {
  const posts = await Post.findAll().catch((err) => res.status(500).json(err))
  res.status(200).json(posts)
})


// get post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id).catch((err) => res.status(500).json(err))
    if (!post) {
      res.status(404).json({message: 'No post found with this id!'})
      return;
    }
    res.status(200).json(post)

  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})


// POST new blog
router.post('/', async (req, res) => {
  // console.log(`Request: ${req.body}`)
  const newPost = await Post.create(req.body).catch((err) => res.status(500).json(err))
  res.status(200).json({message: 'Post created', newPost})
})


// PUT by id
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.update(req.body, {where: {id: req.params.id}})
    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json({message: 'Post updated'})
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})


// DELETE by id
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {id: req.params.id},
    });

    if (!post) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json({message: 'Post deleted'});

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
