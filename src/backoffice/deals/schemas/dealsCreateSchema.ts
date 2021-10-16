import Joi from 'joi'

const dealsCreateSchema = Joi.object({
  deals: Joi.array().items({
    title: Joi.string().required().min(1).max(50),
    value: Joi.number().positive().required().max(1000000000),
    status: Joi.string().required().valid('won', 'lost', 'open'),
  }),
})

export { dealsCreateSchema }
