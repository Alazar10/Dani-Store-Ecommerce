import axios from 'axios'
import { backendUrl } from '../config'

const privateApi = axios.create({
  baseURL: `${backendUrl}/api`
})

// call this after login/logout to set or remove the token
export function setAuthToken(token) {
  if (token) {
    privateApi.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete privateApi.defaults.headers.common.Authorization
  }
}

export default privateApi
