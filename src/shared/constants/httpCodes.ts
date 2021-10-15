const HTTP_STATUS_CODE = {
  OK: { statusCode: 200, name: 'Ok' },
  POST: { statusCode: 201, name: 'Created' },
  PUT: { statusCode: 204, name: 'No content' },
  NOT_FOUND: { statusCode: 404, name: 'Not Found' },
  BAD_REQUEST: { statusCode: 400, name: 'Bad Request' },
  INTERNAL_SERVER_ERROR: { statusCode: 500, name: 'Internal Server Error' },
  UNPROCESSABLE_ENTITY: { statusCode: 422, name: 'Unprocessable Entity' },
  CONFLICT: { statusCode: 409, name: 'Conflict' },
  FORBIDDEN: { statusCode: 403, name: 'Forbidden' },
  BAD_GATEWAY: { statusCode: 502, name: 'Bad Gateway' },
  UNAUTHORIZED: { statusCode: 401, name: 'Unauthorized' }
}
export default HTTP_STATUS_CODE
