const notFound = (req, res, next) => {
  //Whenever a client tries to access an invalid endpoint, create an error
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); //Set the HTTP status to 404
  // pass the error to the error handler
  next(error);
};

const errorHandler = (error, req, res, next) => {
  //Determine the status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  //Check for mongoose bad ObjectId

  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 400;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
};

export { notFound, errorHandler };
