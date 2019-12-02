const express = require('express'),
      router = express.Router(),
      bcrypt = require('bcrypt'),
      multer = require('multer'),
      {login} = require('../controllers/login'),
      {createUser, deleteUser} = require('../controllers/users'),
      {image} = require('../controllers/image'),
      bio = require('../controllers/putBio'),
      post =  require('../controllers/post/post'),
      like =  require('../controllers/post/like'),
      comment =  require('../controllers/post/comment'),
      auth =  require('../controllers/auth'),
      {requireAuth, handleError} = require('../middleware/middleware')
      
 
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatars')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

let upload = multer({ storage: storage })

router.post('/login', handleError, (req, res, next) => {login(bcrypt, req, res, next)})
router.post('/users', handleError, (req, res, next) => {createUser(bcrypt, req, res, next)})
router.delete('/users/:id', [requireAuth, handleError], (req, res, next) => {deleteUser(req, res, next)})
router.put('/users/image/:id', [requireAuth, upload.single('avatar'), handleError], (req, res, next) => {image(req, res, next)})
router.put('/users/bio/:id', [requireAuth, handleError], (req, res, next) => {bio.putBio(req, res, next)})
router.get('/posts', [requireAuth, handleError], (req, res, next) => {post.get(req, res, next)})
router.post('/posts/:id', [requireAuth, handleError], (req, res, next) => {post.create(req, res, next)})
router.delete('/posts/:id', [requireAuth, handleError], (req, res, next) => {post.deletePost(req, res, next)})
router.put('/posts/like/:postid', [requireAuth, handleError], (req, res, next) => {like.add(req, res, next)})
router.delete('/posts/like/:postid', [requireAuth, handleError], (req, res, next) => {like.remove(req, res, next)})
router.put('/posts/comment/:postid', [requireAuth, handleError], (req, res, next) => {comment.add(req, res, next)})
router.post('/auth/revoke', [requireAuth, handleError], (req, res, next) => {auth.revoke(req, res,next)})

module.exports = router