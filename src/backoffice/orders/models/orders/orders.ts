import { Schema, model } from 'mongoose'

const ordersSchemaConfiguration = new Schema({
  newReport: Object,
})

model('orders', ordersSchemaConfiguration)
