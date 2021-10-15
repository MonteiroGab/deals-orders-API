import { app } from '../app'

const start = async () => {
  try {
    const port = process.env.PORT || 3000
    app.listen(port, '0.0.0.0', (err, address) => {
      if (err) {
        throw err
      }
      app.log.debug(`server listening on ${address}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
