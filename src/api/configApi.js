import axios from 'axios'
import { getEvnVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEvnVariables()

const configApi = axios.create({
    baseURL: 'http://192.168.0.12:3000/api'
    //'10.11.10.82'
   // baseURL: 'http://10.11.10.82:3000/api'
})

//Todo: configurar interceptores

configApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization': localStorage.getItem('token')
    }

    return config
})

export default configApi