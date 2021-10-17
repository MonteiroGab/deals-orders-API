import { getOrders } from '@src/backoffice/orders/handler'

const ordersRoutes = {
  params: (fastify, _opts, next) => {
    fastify.get('', getOrders)
    next()
  },
}
export { ordersRoutes }
