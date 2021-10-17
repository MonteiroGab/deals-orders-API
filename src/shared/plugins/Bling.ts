import Axios from './Axios'
import { toXML } from 'jstoxml'
import {stringify} from 'querystring'

class Bling {
  static blingUrl: string = process.env.BLING_API_URL
  static apiKey: string = process.env.BLING_API_TOKEN
  static headers = { 'Content-type': 'application/x-www-form-urlencoded' }

  async createOrder(order: any) {
    const body = {
      apikey: Bling.apiKey, 
      xml: order
    }
    return await Axios.post(
      `${Bling.blingUrl}/pedido/json/`,
      stringify(body),
      Bling.headers
    )
  }

  formatOrderFromJsonToXml(dealReceivedData: any) {
    const xmlOptions = {
      header: true,
      indent: '  ',
    }

    const dateBasicSplitted = dealReceivedData.wonTime.split(' ')
    const dateSplittedYearMonthday = dateBasicSplitted[0].split('-')
    const xmlBody = {
      pedido: {
        data: `${dateSplittedYearMonthday[2]}/${dateSplittedYearMonthday[1]}/${dateSplittedYearMonthday[0]}`,
        cliente: { nome: dealReceivedData.personName },
        transporte: {
          volumes: { volume: { servico: 'SEDEX - CONTRATO' } },
        },
        itens: {
          item: { descricao: dealReceivedData.title, qtde: 1, vlr_unit: dealReceivedData.value, codigo: 100 },
        },
        parcelas: {
          parcela: {
            vlr: dealReceivedData.value,
          },
          data: dealReceivedData.wonTime
        },
      },
    }
    const dealXml = toXML(xmlBody, xmlOptions)
    return dealXml
  }

  async getOrders() {
    return await Axios.get(
      `${Bling.blingUrl}/pedidos/json/?apikey=${Bling.apiKey}`,
      {}
    )
  }
}

export default Bling
