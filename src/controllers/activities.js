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
    INSERT INTO activity(${Object.keys(body).join()}, created_at)
    VALUES (${Object.keys(body).map((key) => `:${key}`).join()}, now())
  `
  await req.db.query(query, {
    replacements: body,
    type: QueryTypes.INSERT
  })
  res.status(201).send()
}

/**
 * Get all activities
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
  const params = req.query

  const query = `SELECT 
     *
  FROM activity ${Object.keys(params).length > 0 ? 'WHERE ' : ''}${Object.keys(params).map((key) => `${key} = :${key}`).join(' AND ')}`

  const result = await req.db.query(query, {
    replacements: params,
    type: QueryTypes.SELECT
  })
  res.status(200).send(result)
}

/**
 * Get one activities
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getOne = async (req, res) => {
  const { id } = req.params

  const query = `SELECT 
     *
  FROM activity WHERE id = :id`

  const result = await req.db.query(query, {
    replacements: {
      id: parseInt(id)
    },
    type: QueryTypes.SELECT
  })
  res.status(200).send(result.length > 0 ? result[0] : {})
}

/**
 * Delete one activities
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const deleteOne = async (req, res) => {
  const { id } = req.params

  const query = 'DELETE FROM activity WHERE id = :id'

  const result = await req.db.query(query, {
    replacements: {
      id: parseInt(id)
    },
    type: QueryTypes.SELECT
  })
  res.status(201).send(result.length > 0 ? result[0] : {})
}

/**
 * Update one activities
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const put = async (req, res) => {
  const { id } = req.params
  const body = req.body

  const query = `UPDATE activity SET ${Object.keys(body).map((key) => `${key} = :${key}`).join()}, updated_at = now() WHERE id = :id`
  console.log(query)

  const result = await req.db.query(query, {
    replacements: {
      id: parseInt(id),
      ...body
    },
    type: QueryTypes.SELECT
  })
  res.status(201).send(result.length > 0 ? result[0] : {})
}

router.post(
  '/activities',
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

router.get(
  '/activities',
  checkSchema({
    id: {
      in: ['query'],
      errorMessage: 'id must be a number',
      optional: true,
      isNumeric: true,
    },
    actualstart: {
      in: ['query'],
      errorMessage: 'actualstart must be a date',
      optional: true,
      isDate: true,
    },
    actualend: {
      in: ['query'],
      errorMessage: 'actualend must be a date',
      optional: true,
      isDate: true,
    },
    subject: {
      in: ['query'],
      errorMessage: 'subject must be a text',
      optional: true,
      isString: true,
    },
    pjo_empreendimentoid: {
      in: ['query'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      optional: true,
      isNumeric: true,
    },
    pjo_blocoid: {
      in: ['query'],
      errorMessage: 'pjo_blocoid must be a number',
      optional: true,
      isNumeric: true,
    },
    pjo_unidadeid: {
      in: ['query'],
      errorMessage: 'pjo_unidadeid must be a number',
      optional: true,
      isNumeric: true,
    },
    pjo_tipodeatividade: {
      in: ['query'],
      errorMessage: 'pjo_tipodeatividade must be a number',
      optional: true,
      isNumeric: true,
    },
  }),
  validateRequest,
  getAll
)

router.get(
  '/activities/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true,
    },
  }),
  validateRequest,
  getOne
)

router.delete(
  '/activities/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true,
    },
  }),
  validateRequest,
  deleteOne
)

router.put(
  '/activities/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true,
    },
    actualstart: {
      in: ['body'],
      errorMessage: 'actualstart must be a date',
      isDate: true,
      optional: true,
    },
    actualend: {
      in: ['body'],
      errorMessage: 'actualend must be a date',
      isDate: true,
      optional: true,
    },
    subject: {
      in: ['body'],
      errorMessage: 'subject must be a text',
      isString: true,
      optional: true,
    },
    pjo_empreendimentoid: {
      in: ['body'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_blocoid: {
      in: ['body'],
      errorMessage: 'pjo_blocoid must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_unidadeid: {
      in: ['body'],
      errorMessage: 'pjo_unidadeid must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_tipodeatividade: {
      in: ['body'],
      errorMessage: 'pjo_tipodeatividade must be a number',
      isNumeric: true,
      optional: true,
    },
  }),
  validateRequest,
  put
)

export default router
