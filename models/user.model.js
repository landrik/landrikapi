const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const schema = mongoose.Schema;


const UserSchema = new schema(
    {
      username: {
        type:String,
        trim: true,
        required: true,
        maxlength: 32
      },
      email: {
        type:String,
        unique:true,
        trim: true,
        required: true,
        maxlength: 32
      },
      hashed_password: {
        type:String,
        required: true,
      },
      about:{
        type:String,
      },
      role:{
        type: Number,
        default: 0
      },
      history:{
        type: Array,
        default: []
      },
      salt:String
    },
  // {
  //   firstname: {
  //     type:String,
  //     trim: true,
  //     required: true,
  //     maxlength: 100
  //   },
  //   lastname: {
  //     type:String,
  //     trim: true,
  //     required: true,
  //     maxlength: 100
  //   },
  //   username: {
  //     type:String,
  //     trim: true,
  //     required: true,
  //     maxlength: 32
  //   },
  //   email: {
  //     type:String,
  //     unique:true,
  //     trim: true,
  //     required: true,
  //     maxlength: 32
  //   },
  //   hashed_password: {
  //     type:String,
  //     required: true,
  //   },
  //   phoneNumber: {
  //     type: String
  //   },
  //   country: {
  //     type: String
  //   },
  //   role:{
  //     type: Number,
  //     default: 0
  //   },
  //   about:{
  //     type:String,
  //   },
  //   photo:{},
  //   salt:String,
  //   history:{
  //     type: Array,
  //     default: []
  //   }
  // },
  { timestamps: true}
);


//virtual fields
UserSchema.virtual('password')
  .set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){
    return this._password
  })

// Virtual for user's full name
// UserSchema.virtual('fullname')
//   .get(function () {
//   // To avoid errors in cases where an author does not have either a family name or first name
//   // We want to make sure we handle the exception by returning an empty string for that case
//   var fullname = '';
//   if (this.firstname && this.lastname) {
//     fullname = this.firstname + ' ' + this.lastname
//   }
//   if (!this.firstname || !this.lastname) {
//     fullname = '';
//   }

//   return fullname;
// });  

UserSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password){
    if(!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest("hex")
    } catch (error) {
      return ''
      
    }
  }
}  
// Apply the uniqueValidator plugin to userSchema.
//UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('user', UserSchema);


