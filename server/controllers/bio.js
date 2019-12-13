const User = require('../models/User')
const { handleSuccessResponse } = require('../helpers/handleResponse')

module.exports.put = async (req, res, next) => {
  const id = req.params.id
  const bio = req.body.bio 

  try {
    await User.findByIdAndUpdate(id, { bio })
    handleSuccessResponse(res, 201, null)
  } catch (err) {
    next(err)
  }
}