import { IDealsData } from '../interfaces/IDeals'
import { IPersonData } from '../interfaces/IPersons'

class PersonsHelper {
  private personsFormattedData: Array<IPersonData> = []

  constructor(dealsReceivedData: Array<IDealsData>) {
    this.setPersonsFormattedData(dealsReceivedData)
  }

  setPersonsFormattedData(dealsReceivedData: Array<IDealsData>) {
    for (const deal of dealsReceivedData) {
      this.personsFormattedData.push({ name: deal.person_name })
    }
  }

  getPersonsFormattedData() {
    return this.personsFormattedData
  }
}


export default PersonsHelper