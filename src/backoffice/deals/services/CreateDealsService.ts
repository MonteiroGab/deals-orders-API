import AppError from "@src/shared/errors/ApplicationError"
import Axios from "@src/shared/plugins/Axios"
import { IDealsData } from "../interfaces/IDeals"

class CreateDealsService  {
  private deals: Array<IDealsData>

  constructor(dealsReceivedData: Array<IDealsData>){
    this.deals = dealsReceivedData
  }

  private async sendDealsToCRM(deal: IDealsData){
    const crmUrl = `https://${process.env.PIPEDRIVE_HOST}.pipedrive.com/v1/deals?api_token=${process.env.PIPEDRIVE_API_TOKEN}`
    const headers = {'content-type': 'application/json; charset=utf-8'}
    try {
      const {data, status} = await Axios.post(crmUrl, JSON.stringify(deal), headers)
      if(data.success === false || status >= 400){
        throw new AppError("Pipedrive integration error.", status, {error_info: data.error})
      }
    } catch (error) {
      throw error
    }
  } 

  async execute(): Promise<any> {
     for await (const deal of this.deals) {
        await this.sendDealsToCRM(deal)
     }
     return { message: 'Success. All deals inserted.', statusCode: 201, data: {}}
  }
}

export default CreateDealsService