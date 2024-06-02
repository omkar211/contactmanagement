module.exports.successResponse = (req, res, msg, data, code = 200) =>
  res.send({
    ResultCode: code,
    ReturnMessage: msg || "Success",
    ResponseData: data,
  });

module.exports.successResponseWithKeys = (req, res, code, msg, values) =>
  res.send({
    ResultCode: code,
    ReturnMessage: msg || "Success",
    ...values,
  });

module.exports.errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500
) =>
  res.status(code || 500).json({
    ResultCode: code,
    ReturnMessage: errorMessage,
    ResponseData: null,
  });