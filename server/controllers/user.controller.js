const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  createUser: (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        error: 'Name, Email and Password are mandatory.'
      })
    }

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
        error: 'No matching user found.'
      })
      const id = data._id
      const { name, email } = data;
      const token = jwt.sign({
        id
      }, 'secret');

      res.cookie(
        "username",
        name + "," + email,
        {
          expires: new Date(Date.now() + 84000000),
          httpOnly: true,
        }
      );

      res.cookie("token", token, {
        expires: new Date(Date.now() + 84000000),
        httpOnly: true,
      });

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
  },

  // get current login user
  getCurrentUser: async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      const user = jwt.verify(token, 'secret');
      const { id } = user;
      
      const currentUser = await User.findOne({ _id: id }).select('-password -boards')
      if (!currentUser) {
        return res.json({
          error: 'No User Found'
        })
      } else {
        return res.json({
          message: 'User found, Successfully',
          currentUser
        })
      }
    } else {
      return res.json({
        error: 'Token expired. Please login to continue'
      })
    }
    
  },

  // logout current user
  logout: async (req, res, next) => {
    
    res.clearCookie('token');
    res.clearCookie('username');
    return res.json({
      message: 'User is logged out. Please login to continue'
    })
  }
}