import axios, { AxiosResponse } from 'axios'

class Axios {
  static async get(url: string, headers: { [key: string]: string }): Promise<AxiosResponse> {
    const response = await axios
      .get(url, {
        headers,
      })
      .catch(error => error.response || error)
    return response
  }

  static async post(url: string, body: any, headers: { [key: string]: string }): Promise<AxiosResponse> {
    const response = await axios.post(url, body, { headers }).catch(error => error.response || error)
    return response
  }

  static async put(url: string, body: string, headers: { [key: string]: string }): Promise<AxiosResponse> {
    const response = await axios.put(url, body, { headers }).catch(error => error.response || error)
    return response
  }
}

export default Axios