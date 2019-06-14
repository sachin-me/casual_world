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
  }
}