/**
 * Returns a custom error
 */
class CustomError extends Error {
  /**
   * @type {number}
   */
  statusCode

  /**
   * @param message {string}
   */
  // eslint-disable-next-line
  constructor(message) {
    super(message)
  }

  /**
   * @returns {{ message: string, field?: string, location?: string }[]}
   */
  serializeErrors() {
  }
}

export {
  CustomError
}
