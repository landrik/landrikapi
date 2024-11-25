import { Router } from 'express';
 
//Express route
const router = Router();

const { signup, signin, signout, requireSignin } = require('../controllers/auth.controller')
const { userSignupValidator } = require('../validator')

//signup user
router.post('/signup', userSignupValidator, signup);
//signin user
router.post('/signin', signin);
//signout user
router.post('/signout', signout);



module.exports = router;