import { app } from '../src/shared/app'

describe('server test', () => {
  afterAll(() => {
    app.close()
  })

  test('healthcheck test /', async () => {
    const response: any = await app.inject({
      method: 'GET',
      url: '/healthcheck'
    })
    const jsonResponse = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(jsonResponse.status).toBe('ok')
  })

  
})
