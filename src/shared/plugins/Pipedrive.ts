import { IDealsData } from '@src/backoffice/deals/interfaces/IDeals'
import Axios from './Axios'

class Pipedrive {
  static pipedriveUrl: string = process.env.PIPEDRIVE_URL + process.env.PIPEDRIVE_API_TOKEN
  static headers = { 'content-type': 'application/json; charset=utf-8' }

  createDeal(deal: IDealsData) {
    return Axios.post(Pipedrive.pipedriveUrl, JSON.stringify(deal), Pipedrive.headers)
  }

  private formatWonDealsResponse(wonDeals: any) {
    const formattedDealsResponse = []
    for (const wonDeal of wonDeals.data) {
      formattedDealsResponse.push({
        orgName: wonDeal.org_id.name,
        title: wonDeal.title,
        value: wonDeal.value,
        wonTime: wonDeal.won_time,
      })
    }
    return formattedDealsResponse
  }

  async getDeals(status: string): Promise<Array<IDealsData>> {
    const { data } = await Axios.get(`${Pipedrive.pipedriveUrl}&status=${status}`, {})
    return this.formatWonDealsResponse(data)
  }
}

export default Pipedrive
