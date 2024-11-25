import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

//import routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');

//app
const app = express();

//db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit()
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());
app.use(cookieParser());
//app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/', userRoutes);
app.use('/api', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`the GOFIT a MERN Boilerplate is listening on port ${port}!`));