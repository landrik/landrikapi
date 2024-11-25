const User = require('../models/user.model');

//Retrieve and redturn all users from database
exports.findAll = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({count: users.length, success: true, users: users })
  } catch (error) {
    return res.status(500).json({success: false, error:'Server Error'})
  }
}

//Find a single user with userId
exports.findOne = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if(!user) {
      res.status(404).send({ message: "User with id"  + req.params.id + "could not be found"})
    }else{
      res.status(200).json({success: true, user:user })
    }

  } catch (error) {
    res.status(500).json({success: false, error: 'Server Error'})
  }
}

//Update a user identified by a userId in the request
exports.update = async (req, res) => {

  const { id } = req.params
  const { params } = req.body

  try {
    const userExist = await User.findById(req.params.id)
    let newPassword
    if(req.body.password){
      newPassword = bcrypt.hashSync(req.body.password, 10)
    }else{
      newPassword = userExist.password
    }

    const file = req.file;
    let imagepath;

    //if(!file) return res.status(400).send('No image found in the request!')

    if(file){
      const fileName = file.filename;
      const basePath=`${req.protocol}://${req.get('host')}/api/public/uploads/`;
      imagepath = `${basePath}${fileName}`
    }else{
      imagepath = User.photo
    }
    

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        dob: req.body.dob,
        about: req.body.about,
        photo: imagepath,
      },
      {new: true}
    )
    
    if(!user) res.status(400).send('the user cannot ne created!')
    res.send(user)

  } catch (error) {
    res.status(400).json({success: false, error})
  }

}

//Delete a user identified by a userId in the request
exports.delete = async(req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndRemove(id)
    if(!user){
      res.status(404).json({success: false, message: 'this user has not been found!'})
    }else{
      res.status(200).json({success: false, message: 'this user has been deleted!'})
    }

  } catch (error) {
    res.status(400).json({success: false, error})
  }
}


