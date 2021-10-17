import GetOrdersService from "../services/GetOrdersService"


class OrdersController {
  async get(): Promise<any> {
    const getOrdersService = new GetOrdersService()
    return await getOrdersService.execute()
  }
}

export default OrdersController