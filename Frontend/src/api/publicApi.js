import axios from 'axios'
import { backendUrl } from '../config'

const publicApi = axios.create({
  baseURL: `${backendUrl}/api`,
  // never send an Authorization header
  headers: { Authorization: undefined }
})

export default publicApi
