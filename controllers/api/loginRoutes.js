const router = require("express").Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const { User } = require("../../models");


// LOGIN/CREATE SESSION
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

    // console.log(req.session)
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGOUT/DESTROY DESSION
router.post('/logout', (req, res) => {
  // console.log("here")
  if (req.session.loggedIn) {
    // console.log("log out now!!!!")
    req.session.destroy(() => {
      res.json({message: 'here'}).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;