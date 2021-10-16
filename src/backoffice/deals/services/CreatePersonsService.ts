import HTTP_STATUS_CODE from '@src/shared/constants/httpCodes'
import MESSAGES from '@src/shared/constants/responseMessages'
import AppError from '@src/shared/errors/ApplicationError'
import Pipedrive from '@src/shared/plugins/Pipedrive'
import { IPersonData, IPersonId } from '../interfaces/IPersons'

class CreatePersonsService {
  private persons: Array<IPersonData>

  constructor(personsReceivedData: Array<IPersonData>) {
    this.persons = personsReceivedData
  }

  async execute(): Promise<any> {
    const listOfPromisePersons = []
    const pipedrive = new Pipedrive()
    for (const person of this.persons) {
      listOfPromisePersons.push(pipedrive.createPerson(person))
    }
    let personsId: Array<IPersonId> = []
    await Promise.all(listOfPromisePersons)
      .catch(() => {
        throw new AppError(
          MESSAGES.ERROR.PERSONS.ERROR_CREATE_PERSON_PIPEDRIVE,
          HTTP_STATUS_CODE.BAD_GATEWAY.statusCode,
          {},
        )
      })
      .then((response: Array<any>) => {
        for (const personData of response) {
          personsId.push(personData.data.data.id)
        }
      })

    return personsId
  }
}

export default CreatePersonsService
