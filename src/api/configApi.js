import axios from 'axios'
import config from "../../config";

const configApi = axios.create({
    baseURL: config.URL_API_LOCAL
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