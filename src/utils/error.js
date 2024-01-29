const redColor = '\x1b[31m';
const resetColor = '\x1b[0m';

export class CustomError extends Error {
  constructor(description, { message } = {}) {
    super(
      `${description}${resetColor}`,
      message ? { cause: message } : undefined
    );
    this.name = `${redColor}Something went wrong`;
  }
}
