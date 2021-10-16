require('../models/orders/orders')
import Bling from '@src/shared/plugins/Bling'
import { groupBy } from 'lodash'
import { model } from 'mongoose'
const ordersSchemaConfiguration = model('orders')
import { IOrders } from '../interfaces/IOrders'

function blingClearRequestsLimits() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('Waiting for Bling API to clear the limit of requests per seconds')
    }, 250)
  })
}

class CreateOrdersService {
  private orders: Array<IOrders>

  constructor(ordersReceivedData: Array<IOrders>) {
    this.orders = ordersReceivedData
  }

  async execute(): Promise<any> {
    const bling = new Bling()
    for await (const order of this.orders) {
      const xmlOrder = bling.formatOrderFromJsonToXml(order)
      await bling.createOrder(xmlOrder)
      await blingClearRequestsLimits().then(function (result) {
        console.log(result)
      })
    }

    const blingOrders: any = await bling.getOrders()
    const orders = blingOrders.data.retorno.pedidos
    const ordersList: Array<any> = []
    for (const order of orders) {
      const currentOrder = order.pedido
      ordersList.push({ date: currentOrder.data, price: currentOrder.totalvenda })
    }
    const groupOrdersByDate = groupBy(ordersList, 'date')
    for (const date in groupOrdersByDate) {
      let priceSum = 0
      for (const orderData of groupOrdersByDate[date]) {
        priceSum = Number(orderData.price) + priceSum
      }
      const newTotalDayValue = new ordersSchemaConfiguration({ newReport: { [date]: { totalPrice: priceSum } } })
      await newTotalDayValue.save()
    }
  }
}

export default CreateOrdersService
