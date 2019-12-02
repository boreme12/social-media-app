const Post = require('../../models/Post')
const User = require('../../models/User')
const { handleSuccessResponse } = require('../../helpers/handleResponse')

const create = async (req, res, next) => {
  const { id } = req.params

  const getUserData = async () => (
   User.findById(id, 'username avatar').exec()
  )

  const createPost = async (userData) => {
    let newPost = new Post({
      message: req.body.message,
      userId: req.params.id,
      username: userData.username,
      avatar: userData.avatar,
      commentCount: 0,
      likeCount: 0
    })

    const postData = await newPost.save().catch(err => next(err))
    handleSuccessResponse(res, 201, { postId: postData._id })
  }

  const userData =  await getUserData().catch(err => next(err))
  createPost(userData).catch(err => next(err))
}

const get = (req, res, next) => {
  const getPostData = async () => {
    const posts = await Post.find({}).sort({ _id: -1 }).limit(10)
    const postObj = {
      data: [
        ...posts
      ]
    }
    handleSuccessResponse(res, 200, postObj)
  }
  getPostData().catch(err => next(err))
}

const deletePost = async (req, res, next) => {
  await Post.deleteOne({ _id: req.params.id })
    .catch(err => {
      return next('Server error on DELETE request')
    })

  handleSuccessResponse(res, 202, null)
}

module.exports = {
  create: create, 
  get: get,
  deletePost: deletePost
}