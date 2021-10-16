import HTTP_STATUS_CODE from '@src/shared/constants/httpCodes'
import MESSAGES from '@src/shared/constants/responseMessages'
import AppError from '@src/shared/errors/ApplicationError'
import Pipedrive from '@src/shared/plugins/Pipedrive'
import { IDealsData } from '../interfaces/IDeals'

class CreateDealsService {
  private deals: Array<IDealsData>

  constructor(dealsReceivedData: Array<IDealsData>) {
    this.deals = dealsReceivedData
  }

  async execute(): Promise<any> {
    const listOfPromiseDeals = []
    const pipedrive = new Pipedrive()
    for (const deal of this.deals) {
      listOfPromiseDeals.push(pipedrive.createDeal(deal))
    }
    let wonDeals: Array<IDealsData>
    await Promise.all(listOfPromiseDeals).catch(() => {
      throw new AppError(MESSAGES.ERROR.DEAL.ERROR_CREATE_DEAL_PIPEDRIVE, HTTP_STATUS_CODE.BAD_GATEWAY.statusCode, {})
    }).then(async () => wonDeals = await pipedrive.getDeals("won"))
    
    return {
      message: MESSAGES.SUCCESS.DEAL.SUCCESS_CREATE_DEAL_PIPEDRIVE,
      statusCode: HTTP_STATUS_CODE.OK.statusCode,
      data: wonDeals,
    }
  }
}

export default CreateDealsService
