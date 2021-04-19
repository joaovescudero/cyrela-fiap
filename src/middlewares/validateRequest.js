// eslint-disable-next-line
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/requestValidationError'

/**
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
const validateRequest = (
  req,
  res,
  next
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array())

  next()
}

export {
  validateRequest
}
