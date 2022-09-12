const responseData = function (response, statusCode, values) {
  var data = {
      success: true,
      data: values,
  };
  response.status(statusCode).json(data);
  response.end();
};

const responseMessage = function (response, statusCode, message,additionalData=null) {
  var data = {
      success: true,
      message: message,
      data:additionalData
  };
  response.status(statusCode).json(data);
  response.end();
};

module.exports = { responseData, responseMessage };