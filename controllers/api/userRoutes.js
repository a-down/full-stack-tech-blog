const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');


// CREATE USER
// CREATE SESSION
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// LOGIN TO CREATE SESSION
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!1' });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }

    req.session.save(()=> {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
  
      res.json({ user: userData, message: 'You are now logged in!'})
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


// LOGOUT AND DESTROY SESSION
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
