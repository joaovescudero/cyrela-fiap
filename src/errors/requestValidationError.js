// eslint-disable-next-line
import { ValidationError } from 'express-validator'
import { CustomError } from './customError'

/**
 * Return a Request Validation Error
 */
class RequestValidationError extends CustomError {
  /**
   * @type {number}
   */
  statusCode = 400

  /**
   * @type {ValidationError[]}
   */
  errors = []

  /**
   * @param errors {ValidationError[]}
   */
  constructor(errors) {
    super('Invalid request parameters')
    this.errors = errors
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
      location: err.location
    }))
  }
}

export {
  RequestValidationError
}
