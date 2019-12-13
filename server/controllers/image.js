let User = require('../models/User')
var mongoose = require('mongoose');
const { handleSuccessResponse } = require('../helpers/handleResponse')

updateImage = async (req) => {
  const id = req.params.id
  const img = req.file.filename
  let finalImg = {
    avatar:  img,
  }

  await User.findByIdAndUpdate(id, finalImg).exec()
  return { image: img }
}

image = async (req, res, next) => {
  if(!req.file){
    return res.status(409).json({
      status: 'fail',
      message: 'Image upload failed'
    })
  }
  
  try {
    const respObj = await updateImage(req)
    handleSuccessResponse(res, 201, respObj)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  image
}