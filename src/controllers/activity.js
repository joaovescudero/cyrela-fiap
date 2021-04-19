import express from 'express'
import { Sequelize, QueryTypes } from 'sequelize'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'

const router = express.Router()

/**
 * Insert new activity
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const insert = async (req, res) => {
  const body = req.body
  const query = `
    INSERT INTO public.activity(${Object.keys(body).join()})
    VALUES ${Object.keys(body).map((key) => `:${key}`).join()}
  `
  await req.db.query(query, {
    replacements: body,
    type: QueryTypes.INSERT
  })
  res.status(201).send()
}

router.post(
  '/activity',
  checkSchema({
    actualstart: {
      in: ['body'],
      errorMessage: 'actualstart must be a date',
      isDate: true,
    },
    actualend: {
      in: ['body'],
      errorMessage: 'actualend must be a date',
      isDate: true,
    },
    subject: {
      in: ['body'],
      errorMessage: 'subject must be a text',
      isString: true
    },
    pjo_empreendimentoid: {
      in: ['body'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      isNumeric: true,
    },
    pjo_blocoid: {
      in: ['body'],
      errorMessage: 'pjo_blocoid must be a number',
      isNumeric: true,
    },
    pjo_unidadeid: {
      in: ['body'],
      errorMessage: 'pjo_unidadeid must be a number',
      isNumeric: true,
    },
    pjo_tipodeatividade: {
      in: ['body'],
      errorMessage: 'pjo_tipodeatividade must be a number',
      isNumeric: true,
    },
  }),
  validateRequest,
  insert
)

export default router
