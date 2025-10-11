export class ValidationError extends Error {
  constructor(message = "Validation failed", statusCode = 400) {
    super(message);
    this.name = "ValidationError";
    this.errorsList = [];
    this.statusCode = statusCode;
    this.payload = null;
  }

  addError(...errorMsg) {
    this.errorsList.push(...errorMsg);
    return this;
  }

  addPayload(payload) {
    this.payload = payload;
    return this;
  }

  getPayload() {
    return this.payload;
  }

  hasErrors() {
    return this.errorsList.length > 0;
  }
}
