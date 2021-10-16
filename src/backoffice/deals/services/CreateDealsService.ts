import HTTP_STATUS_CODE from '@src/shared/constants/httpCodes'
import MESSAGES from '@src/shared/constants/responseMessages'
import AppError from '@src/shared/errors/ApplicationError'
import Pipedrive from '@src/shared/plugins/Pipedrive'
import { IDealsData } from '../interfaces/IDeals'
import { IPersonData } from '../interfaces/IPersons'
import CreateOrdersService from './CreateOrdersService'

class CreateDealsService {
  private deals: Array<IDealsData>
  private persons_id: Array<IPersonData>

  constructor(dealsReceivedData: Array<IDealsData>, personsReceivedData: Array<IPersonData>) {
    this.deals = dealsReceivedData
    this.persons_id = personsReceivedData
  }

  async execute(): Promise<any> {
    const listOfPromiseDeals = []
    const pipedrive = new Pipedrive()
    for (let index = 0; index < this.deals.length; index++) {
      const deal = this.deals[index]
      delete deal.person_name
      const addDate = deal.date
      delete deal.date
      const dealWithPerson = { ...deal, ...{ person_id: this.persons_id[index] }, ...{ add_time: addDate } }
      listOfPromiseDeals.push(pipedrive.createDeal(dealWithPerson))
    }

    let wonDeals: Array<IDealsData>
    await Promise.all(listOfPromiseDeals)
      .catch(() => {
        throw new AppError(MESSAGES.ERROR.DEAL.ERROR_CREATE_DEAL_PIPEDRIVE, HTTP_STATUS_CODE.BAD_GATEWAY.statusCode, {})
      })
      .then(async () => (wonDeals = await pipedrive.getDeals('won')))

    const createOrdersService = new CreateOrdersService(wonDeals)
    const response = createOrdersService.execute()

    return {
      message: MESSAGES.SUCCESS.DEAL.SUCCESS_CREATE_DEAL_PIPEDRIVE,
      statusCode: HTTP_STATUS_CODE.OK.statusCode,
      data: response,
    }
  }
}

export default CreateDealsService
