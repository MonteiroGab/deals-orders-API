import CreateDealsService from "../services/CreateDealsService"
class DealsController {
  async create(body): Promise<any> {
    const createDealsService = new CreateDealsService(body)
    return await createDealsService.execute()
  }
}

export default DealsController