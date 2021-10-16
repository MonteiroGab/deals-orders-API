import Joi from 'joi'

const dealsCreateSchema = Joi.object({
  deals: Joi.array().items({
    title: Joi.string().required().min(1).max(50),
    value: Joi.number().positive().required().max(1000000000),
    status: Joi.string().required().valid('won', 'lost', 'open', 'deleted'),
    person_name: Joi.string().required().min(1).max(50),
    date: Joi.string().required().regex(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/)
  }),
})

export { dealsCreateSchema }
