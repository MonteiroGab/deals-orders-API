/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class HealthCheckService {
  protected async getHealthCheckStatus(): Promise<any> {
    return {
      status: 'ok',
    }
  }
}
