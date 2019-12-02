const Post = require('../../models/Post')
const { handleSuccessResponse } = require('../../helpers/handleResponse')

const add = (req, res, next) => {
  addComment = async () => {
    const { userId, username, avatar, comment } = req.body
    const { postid } = req.params

    const filter = {
      _id: postid
    }

    const data = {
      userId: userId,
      username: username,
      avatar: avatar,
      comment: comment
    }

    await Post.findOneAndUpdate(
      filter, 
      { $inc: {'commentCount' : 1}, 
      $push: {comments: data}},
      {safe: true, upsert: true, new : true}
    )

    handleSuccessResponse(res, 201, null)
  }

  addComment().catch(err =>{
    next(err)
  })
}

const remove = (req, res, next) => {
  removeLike = async () => {
    const { userId } = req.body
    const { id } = req.params

    await Post.findOneAndUpdate(
      id, 
      {$inc: {'likeCount' : -1}, 
      $pull: {likes:{userId}}},
      {safe: true, upsert: true, new : true}
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