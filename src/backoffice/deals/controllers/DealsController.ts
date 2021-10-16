import CreateDealsService from "../services/CreateDealsService"
import { dealsPreLoadedData } from "../../../shared/storage/deals.json"
import { isEmpty } from "lodash"

class DealsController {
  async create(body): Promise<any> {
    const areDealsNotReceivedFromBody = isEmpty(body)
    const createDealsService = new CreateDealsService(areDealsNotReceivedFromBody ? dealsPreLoadedData : body.deals)
    return await createDealsService.execute()
  }
}

export default DealsController