

module.exports = (err, req, res, next) => {


let getche = Error.captureStackTrace()



  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

 yu
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};