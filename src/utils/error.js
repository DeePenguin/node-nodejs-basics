export class CustomError extends Error {
  constructor(description, { message } = {}) {
    super(description, message ? { cause: message } : undefined);
    this.name = 'Something went wrong';
  }
}
