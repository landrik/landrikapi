import { Router } from 'express';
 
//Express route
const router = Router();

const users = require('../controllers/user.controller');
//const { userSignupValidator } = require('../validator')

//router.get('/', users.sayHi)

// //signup user
// router.post('/signup', userSignupValidator, users.signup);
// //signin user
// router.post('/signin', users.signin);


//get all users
router.get('/users', users.findAll);
 
//get a single user
router.get('/users/:userId', users.findOne);

//update a single user
router.put('/users/:userId', users.update);

//remove a single user
router.delete('/users/:userId', users.delete);
 
module.exports = router;