import HTTP_STATUS_CODE from '../../shared/constants/httpCodes'
import { HealthCheckService } from '../service/healthcheck'

 class HealthCheckController extends HealthCheckService {
  async healthCheckStatus(): Promise<any> {
    try {
      const result = await this.getHealthCheckStatus()
      return {statusCode: HTTP_STATUS_CODE.OK.statusCode, data: result, message: 'health check status' }
    } catch (error) {
      return {statusCode: error.code, data: {}, message: error.message }
    }
  }
}

export default HealthCheckController