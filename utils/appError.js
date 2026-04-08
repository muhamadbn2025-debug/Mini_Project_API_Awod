class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("5") ? "fail" : "error";
  }
}

module.exports = AppError;
