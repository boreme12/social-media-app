const User = require('../models/User')
const { handleSuccessResponse } = require('../helpers/handleResponse')

module.exports.putBio = async (req, res, next) => {
  const id = req.params.id
  const bio = req.body.bio 

  updateBio = async () => {
    await User.findByIdAndUpdate(id, { bio })
    handleSuccessResponse(res, 201, null)
  }

  updateBio().catch(err =>
    next('Server error on put request')
  )
}