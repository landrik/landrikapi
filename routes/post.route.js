import { Router } from 'express';
 
//Express route
const router = Router();

//Post Schema

const posts = require('../controllers/post.controller');

//router.get('/', posts.sayHi)


//get all users
router.get('/posts', posts.getAll);
 
//get a single post
router.get('/posts/:postId', posts.get);

//add a new post
router.post('/posts', posts.create);

//update a single post
router.put('/posts/:postId', posts.update);

//remove a single post
router.delete('/posts/:postId', posts.delete);
 
module.exports = router;