const HTTP_STATUS_CODE = {
  POST: { statusCode: 201, name: 'Created' },
  OK: { statusCode: 200, name: 'Ok' },
  BAD_REQUEST: { statusCode: 400, name: 'Bad Request' },
  BAD_GATEWAY: { statusCode: 502, name: 'Bad Gateway' },
  INTERNAL_SERVER_ERROR: { statusCode: 500, name: 'Internal Server Error' },
  UNPROCESSABLE_ENTITY: { statusCode: 422, name: 'Unprocessable Entity' },
}
export default HTTP_STATUS_CODE
