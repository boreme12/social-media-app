const Post = require('../../models/Post')
const { handleSuccessResponse } = require('../../helpers/handleResponse')

const add = (req, res, next) => {
  addLike = async () => {
    const { userId, username } = req.body
    const { postid } = req.params

    const filter = {
      _id: postid
    }

    const like = {
      userId: userId,
      username: username
    }

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
  }

  addLike().catch(err => {
    next(err)
  })
}

const remove = (req, res, next) => {
  removeLike = async () => {
    const { userId } = req.body
    const { postid } = req.params

    const filter = {
      _id: postid
    }

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
  }

  removeLike().catch(err =>
    next(err)
  )
}

module.exports = {
  add: add,
  remove: remove
}