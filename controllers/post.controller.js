// const { postServices } = require('../../services/data')
// const { captureSuccess } = require('../../services/response')

const { response } = require('express');
const Post = require('../models/post.model');


exports.create = async (req, res) => {
  try {
    // const post = await postServices.create(params)
    // next(captureSuccess(200, 'Name créé avec succès', { post: post }))
    const file = req.file;
    let imagepath;
    if(file){
      const fileName = file.filename;
      const basePath=`${req.protocol}://${req.get('host')}/api/public/uploads/`;
      imagepath = `${basePath}${fileName}`
    }else{
      imagepath = Post.image
      return res.status(400).send('No image found in the request!');
    }


    let post = new Post({
      title : req.body.title,
      description: req.body.description,
      published_date: req.body.published_date,
      updated_date: req.body.updated_date,
      image: imagepath, //"http://localhost:3000/public/upload/image-2323232"
    });

    post = await post.save()

    if(!post) return res.status(500).send('this post cannot be found!')

    res.send(post)


  } catch (error) {
    res.status(500).json({success: false, error: 'Server Error'})
  }
}

exports.update = async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(400).send('This post could not be found!');

    const file = req.file;
    let imagepath;

    //if(!file) return res.status(400).send('No image found in the request!')
    if(file){
      const fileName = file.filename;
      const basePath=`${req.protocol}://${req.get('host')}/api/public/uploads/`;
      imagepath = `${basePath}${fileName}`
    }else{
      imagepath = Post.image
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      { 
        image:imagepath, 
        title:req.body.title, 
        description: req.body.description,
        published_date: req.body.published_date,
        updated_date: req.body.updated_date 
      }, 
      {new: true}
    )
    
    if(!updatedPost) return res.status(500).send('this post cannot be updated!');

    res.send(updatedPost)

  } catch (error) {
    res.status(500).json({success: false, error: 'Server Error'})
  }
}

exports.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndRemove(id);

    if(!post){
      res.status(404).json({success: false, error: 'this post has not been found!'})
    }else{
      res.status(200).json({success: true, message: 'this post has been deleted!', posts: {}})
    }
  }
  catch (error) {
    return res.status(500).json({ success: false, error: 'Server Error'})
  }
}

exports.get = async (req, res, next) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id);
    if(!post) {
      res.status(404).send({ message: "Post not found with id " + id})
    }else{
      res.status(200).json({success: true, posts:post })
    }
  }
  catch (error) {
    res.status(500).json({success: false, error: 'Server Error'})
  }
}

exports.getAll = async (req, res, next) => {

  try {
    const posts = await Post.find({});
    res.status(200).json({success: true, count: posts.length, posts:posts})
  }
  catch (error) {
    return res.status(500).json({success: false, error:'Server Error'})
  }
}
