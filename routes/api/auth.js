const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route GET api/auth
//@desc Test Route
//@acess Public
router.get('/', auth, async (req, res) => {
  try {
    //Since this is a protected route and we used the token that has the ID, & in our middleware we set the req.user
    // to the user in the token, we can access it from anywhere in a protected route. We want the ID and not the password so we used '.select('-password')
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@access Public
router.post(
  '/',
  check('email', 'Must be valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(validationResult(req));
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //When you make a request you can access the data with req.body

    const { email, password } = req.body;

    try {
      // See if user exists, if it does, we will send back an error
      let user = await User.findOne({ email });

      console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //need to make sure the password matches (plain text to encdoded password) password is plain text and user.password is the saved encrypted version
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
