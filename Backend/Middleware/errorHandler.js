// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  // Default response
  let statusCode = 500;
  let message = "Internal Server Error";

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Sequelize foreign key errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = `Invalid foreign key: ${err.index || "constraint failed"}`;
  }

  // Sequelize database errors
  if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = err.message;
  }

  // JWT/Auth errors
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  // Send response
  res.status(statusCode).json({
    status: "error",
    message,
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;