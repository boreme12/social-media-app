const Post = require('../../models/Post')
const { handleSuccessResponse } = require('../../helpers/handleResponse')

const add = async (req, res, next) => {
  const { userId, username } = req.body
  const { postid } = req.params

  const filter = {
    _id: postid
  }

  const like = {
    userId: userId,
    username: username
  }

  try {
    await Post.findOneAndUpdate(
      filter, 
      { 
        $inc: {'likeCount' : 1}, 
        $push: {likes:like}
      },
      {
        safe: true, 
        upsert: true, 
        new : true
      }
    )
  
    handleSuccessResponse(res, 201, null)
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  const { userId } = req.body
  const { postid } = req.params

  const filter = {
    _id: postid
  }
  
  try {
    await Post.findOneAndUpdate(
      filter, 
      {
        $inc: {'likeCount' : -1}, 
        $pull: {likes:{userId: userId}}
      },
      {
        safe: true, 
        upsert: true, 
        new : true
      }
    )

    handleSuccessResponse(res, 201, null)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  add: add,
  remove: remove
}