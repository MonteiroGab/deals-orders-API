import PersonsHelper from "../helpers/PersonsHelper"
import CreateDealsService from "../services/CreateDealsService"
import CreatePersonsService from "../../persons/services/CreatePersonsService";
class DealsController {
  async create(body): Promise<any> {
    const personsHelper = new PersonsHelper(body)
    const personsFormattedData = personsHelper.getPersonsFormattedData();
    const createPersonService = new CreatePersonsService(personsFormattedData)
    const personsId = await createPersonService.execute()
    const createDealsService = new CreateDealsService(body, personsId)
    return await createDealsService.execute()
  }
}

export default DealsController