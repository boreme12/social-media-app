let User = require('../models/User')
var mongoose = require('mongoose');
const { handleSuccessResponse } = require('../helpers/handleResponse')

const image = (req, res, next) => {
  const id = req.params.id
  const img = req.file.filename

  const updateImage = async () => {
    let finalImg = {
      avatar:  img,
    }

    await User.findByIdAndUpdate(id, finalImg).exec()
    const respObj = { image: img }
    handleSuccessResponse(res, 201, respObj)
  }

  if(!req.file){
    return res.status(409).json({
      status: 'fail',
      message: 'Image upload failed'
    })
  }
  updateImage().catch(err => next('error uploading img'))
}

module.exports = {
  image
}