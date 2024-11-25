const User = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
//const expressJwt = require('express-jwt');
const { expressjwt: jwt } = require("express-jwt");
const { errorHandler } = require('../helpers/dbErrorHandler');

// exports.sayHi = (req, res) => {
//   res.json({ message: 'Hello from Node, who is you !'});
// }

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if(err){
      return res.status(400).json({ 
        err: errorHandler(err)
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
}

exports.signin = (req, res) => {
  //find user based on email
  const {email, password} = req.body
  User.findOne({email}, (err, user)=>{
    if(err || !user){
      return res.status(400).json({ 
        err: 'User with that email does not exit, please signup'
      })
    }
    //if user is found make user the email and password match
    //create authenticate method in user method
    if(!user.authenticate(password)){
      return res.status(401).json({
        err: 'Email and password don\'t match'
      })
    }

    //generate a signed token with user id and secret
    const token = jsonwebtoken.sign({_id: user._id}, process.env.JWT_SECRET);
    //persist the token as 't' in cookies with expiry date
    res.cookie('t', token, {expire:new Date() + 9999})
    //return repsonse with user and token to fron client
    //console.log(data);
    const {_id, username, email, role} = user;
    return res.json({ token, user: {_id, email, username, role}})
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: 'Signout success'})
}

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if(!user){
    return res.status(403).json({
      error: "Access denied"
    })
  }
  next();
}
exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "Admin resource! Access denied"
    })
  }
  next();
}