import express from 'express'
import { Sequelize, QueryTypes } from 'sequelize'
import { checkSchema } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest'

const router = express.Router()

/**
 * Insert new occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const insert = async (req, res) => {
  const body = req.body
  const query = `
    INSERT INTO occurrence(${Object.keys(body).join()}, created_at)
    VALUES (${Object.keys(body).map((key) => `:${key}`).join()}, now())
  `
  await req.db.query(query, {
    replacements: body,
    type: QueryTypes.INSERT
  })
  res.status(201).send()
}

/**
 * Get all occurrences
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getAll = async (req, res) => {
  const params = req.query

  const query = `SELECT 
     *
  FROM occurrence ${Object.keys(params).length > 0 ? 'WHERE ' : ''}${Object.keys(params).map((key) => `${key} = :${key}`).join(' AND ')}`

  const result = await req.db.query(query, {
    replacements: params,
    type: QueryTypes.SELECT
  })
  res.status(200).send(result)
}

/**
 * Get one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const getOne = async (req, res) => {
  const { id } = req.params

  const query = `SELECT 
     *
  FROM occurrence WHERE id = :id`

  const result = await req.db.query(query, {
    replacements: {
      id: parseInt(id)
    },
    type: QueryTypes.SELECT
  })
  res.status(200).send(result.length > 0 ? result[0] : {})
}

/**
 * Delete one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const deleteOne = async (req, res) => {
  const { id } = req.params

  const query = 'DELETE FROM occurrence WHERE id = :id'

  const result = await req.db.query(query, {
    replacements: {
      id: parseInt(id)
    },
    type: QueryTypes.SELECT
  })
  res.status(201).send(result.length > 0 ? result[0] : {})
}

/**
 * Update one occurrence
 * @param req {Request|{db: Sequelize}}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const put = async (req, res) => {
  const { id } = req.params
  const body = req.body

  const query = `UPDATE occurrence SET ${Object.keys(body).map((key) => `${key} = :${key}`).join()}, updated_at = now() WHERE id = :id`
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
  '/occurrences',
  checkSchema({
    ticketnumber: {
      in: ['body'],
      errorMessage: 'ticketnumber must be a string',
      isString: true,
    },
    pjo_clientedaunidade: {
      in: ['body'],
      errorMessage: 'pjo_clientedaunidade must be a number',
      isNumeric: true,
    },
    pjo_empreendimentoid: {
      in: ['body'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      isNumeric: true,
    },
    pjo_bloco: {
      in: ['body'],
      errorMessage: 'pjo_bloco must be a string',
      isString: true,
    },
    pjo_unidade: {
      in: ['body'],
      errorMessage: 'pjo_unidade must be a number',
      isNumeric: true,
    },
    pjo_bandeira: {
      in: ['body'],
      errorMessage: 'pjo_bandeira must be a string',
      isString: true,
    },
    description: {
      in: ['body'],
      errorMessage: 'description must be a string',
      isString: true,
    },
  }),
  validateRequest,
  insert
)

router.get(
  '/occurrences',
  checkSchema({
    id: {
      in: ['query'],
      errorMessage: 'id must be a number',
      optional: true,
      isNumeric: true,
    },
    ticketnumber: {
      in: ['query'],
      errorMessage: 'ticketnumber must be a string',
      isString: true,
      optional: true,
    },
    pjo_clientedaunidade: {
      in: ['query'],
      errorMessage: 'pjo_clientedaunidade must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_empreendimentoid: {
      in: ['query'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_bloco: {
      in: ['query'],
      errorMessage: 'pjo_bloco must be a string',
      isString: true,
      optional: true,
    },
    pjo_unidade: {
      in: ['query'],
      errorMessage: 'pjo_unidade must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_bandeira: {
      in: ['query'],
      errorMessage: 'pjo_bandeira must be a string',
      isString: true,
      optional: true,
    },
    description: {
      in: ['query'],
      errorMessage: 'description must be a string',
      isString: true,
      optional: true,
    },
  }),
  validateRequest,
  getAll
)

router.get(
  '/occurrences/:id',
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
  '/occurrences/:id',
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
  '/occurrences/:id',
  checkSchema({
    id: {
      in: ['params'],
      errorMessage: 'id must be a number',
      isNumeric: true,
    },
    ticketnumber: {
      in: ['body'],
      errorMessage: 'ticketnumber must be a string',
      isString: true,
      optional: true,
    },
    pjo_clientedaunidade: {
      in: ['body'],
      errorMessage: 'pjo_clientedaunidade must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_empreendimentoid: {
      in: ['body'],
      errorMessage: 'pjo_empreendimentoid must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_bloco: {
      in: ['body'],
      errorMessage: 'pjo_bloco must be a string',
      isString: true,
      optional: true,
    },
    pjo_unidade: {
      in: ['body'],
      errorMessage: 'pjo_unidade must be a number',
      isNumeric: true,
      optional: true,
    },
    pjo_bandeira: {
      in: ['body'],
      errorMessage: 'pjo_bandeira must be a string',
      isString: true,
      optional: true,
    },
    description: {
      in: ['body'],
      errorMessage: 'description must be a string',
      isString: true,
      optional: true,
    },
  }),
  validateRequest,
  put
)

export default router
