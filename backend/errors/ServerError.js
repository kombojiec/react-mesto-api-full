class ServerError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = 500;
  }
}

module.exports = ServerError;
