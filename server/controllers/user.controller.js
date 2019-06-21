const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  createUser: (req, res) => {

    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
      if (err) return res.json({
        error: 'Could not find the user'
      })
      if (!user) {
        const newUser = new User({
          name,
          email,
          password
        })
        newUser.save((err, createdUser) => {
          if (err) return res.json({
            error: 'failed to save user'
          })
          res.json({
            message: 'User successfully created'
          })
        })
      } else {
        return res.json({
          error: 'Already an user, please login' 
        })
      }
    })
  },

  loginUser: (req, res, next) => {
    
    passport.authenticate('local', {
      session: false
    }, (err, data, info) => {
      if (err) return res.json({
        error: 'Could not login user'
      })
      if (!data) return res.json({
        error: 'Please enter valid credentials'
      })
      const id = data._id
      const { name, email } = data;
      const token = jwt.sign({
        id
      }, 'secret');
      res.json({
        message: `${name}, Successfully logged in`,
        token,
        userInfo: {
          name,
					email,
					id
        }
      })
    })(req, res, next);
  }
}