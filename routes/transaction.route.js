import { Router } from 'express';
 
//Express route
const router = Router();

const transaction = require('../controllers/transaction.controller');

router.get('/', (req, res ) => res.send('hello from transaction route'))

//get all users
router.get('/transactions', transaction.findAll);
 
//get a single user
//add a new user
router.post('/transactions', transaction.create);

//update a single user
//remove a single user
router.delete('/transactions/:id', transaction.delete);


module.exports = router;