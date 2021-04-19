import { CustomError } from './customError'

/**
 * Return a Not Found error
 */
class NotFoundError extends CustomError {
  /**
   * @type {number}
   */
  statusCode = 404

  constructor() {
    super('Route not found')
  }

  serializeErrors() {
    return [{ message: 'Not Found' }]
  }
}

export {
  NotFoundError
}
