const handleErrorResponse = (res, msg, statusCode, status) => {
  res.status(statusCode).json({
    status: status,
    message: msg
  })
};

const handleSuccessResponse = (res, statusCode, jsonObj) => {
  res.status(statusCode).json({
    status: 'success',
    data: {
      ...jsonObj
    }
  })
};

module.exports = {
  handleErrorResponse,
  handleSuccessResponse
}