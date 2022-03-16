export default class HttpError extends Error {
  statusCode: number;
  statusText: string;
  constructor(status: number, statusText: string, message: string) {
    super(`${status}: ${statusText} - ${message}`);
    this.name = "HttpError";
    this.statusCode = status;
    this.statusText = statusText;
    this.message = message;
  }
}
