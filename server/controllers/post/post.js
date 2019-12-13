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

    return await newPost.save()
  }

  try {
    const userData =  await getUserData().catch(err => next(err))
    const postData = await createPost(userData).catch(err => next(err))
    handleSuccessResponse(res, 201, { postId: postData._id })
    
  } catch (err) {
    next('server error on POST request: ', err)
  }
}

const get = async (req, res, next) => {
  const getPostData = async () => {
    return await Post.find({}).sort({ _id: -1 }).limit(10)
  }
  try {
    const posts = await getPostData()
    handleSuccessResponse(res, 200, posts)
  } catch (err) {
    next('server error on GET request: ', err)
  }
}

const remove = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    handleSuccessResponse(res, 202, null)
  } catch (err) {
    next('Server error on DELETE request: ', err)
  }
}

module.exports = {
  create: create, 
  get: get,
  remove: remove
}