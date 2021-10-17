import { IDealsData } from '@src/backoffice/deals/interfaces/IDeals'
import { IPersonData } from '@src/backoffice/persons/interfaces/IPersons'
import Axios from './Axios'

class Pipedrive {
  static pipedriveUrl: string = process.env.PIPEDRIVE_API_URL
  static headers = { 'content-type': 'application/json; charset=utf-8' }

  createDeal(deal: IDealsData) {
    return Axios.post(
      `${Pipedrive.pipedriveUrl}/deals?api_token=${process.env.PIPEDRIVE_API_TOKEN}`,
      JSON.stringify(deal),
      Pipedrive.headers,
    )
  }

  createPerson(person: IPersonData) {
    return Axios.post(
      `${Pipedrive.pipedriveUrl}/persons?api_token=${process.env.PIPEDRIVE_API_TOKEN}`,
      JSON.stringify(person),
      Pipedrive.headers,
    )
  }

  private formatWonDealsResponse(wonDeals: any) {
    const formattedDealsResponse = []
    for (const wonDeal of wonDeals.data) {
      formattedDealsResponse.push({
        title: wonDeal.title,
        value: wonDeal.value,
        wonTime: wonDeal.add_time,
        personName: wonDeal.person_id.name
      })
    }
    return formattedDealsResponse
  }

  async getDeals(status: string): Promise<Array<IDealsData>> {
    const { data } = await Axios.get(
      `${Pipedrive.pipedriveUrl}/deals?api_token=${process.env.PIPEDRIVE_API_TOKEN}&status=${status}`,
      {},
    )
    return this.formatWonDealsResponse(data)
  }
}

export default Pipedrive
