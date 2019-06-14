const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String }
})

userSchema.pre('save', function(next) {
  console.log(this.password, 'check password');
  if(this.password) {
    console.log('Inside pre save')
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
  } else {
    console.log('passed')
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;