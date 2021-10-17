require('../models/orders/orders')
import HTTP_STATUS_CODE from '@src/shared/constants/httpCodes'
import { model } from 'mongoose'
const ordersSchemaConfiguration = model('orders')

class GetOrdersService {
  async execute(): Promise<any> {
    try {
      const result: any = await ordersSchemaConfiguration.find({}, { _id: 0, __v: 0 })
      const reports = []
      for (const report of result) {
        reports.push(report.newReport)
      }
      return {
        message: HTTP_STATUS_CODE.OK.name,
        statusCode: HTTP_STATUS_CODE.OK.statusCode,
        data: reports,
      }
    } catch (error) {
      throw error
    }
  }
}

export default GetOrdersService
