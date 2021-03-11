import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { getToken } from '@/utils/auth'
import { handleError, errorLog } from './error'
import CryptHelper from '@/utils/crypt'
import { Toast } from 'vant'
import { STATUS_CODE } from '@/api'

const Crypto = new CryptHelper()

/**
 * 对请求数据进行处理
 */

function handleRequestData(config: AxiosRequestConfig) {
    if (process.env.VUE_APP_DECRYPT === 'true') {
        const method = config.method as string
        switch (method.toLocaleUpperCase()) {
            case 'GET':
                let aesParams = config.params
                // 是否需要加密参数
                if (process.env.VUE_APP_ENCRYPT === 'true') {
                    aesParams = Crypto.encrypt(aesParams)
                }
                config.params = {}
                config.params.p = aesParams
                break;
            case 'POST':
            case 'PUT':
            case 'DELETE':
                let aesData = config.params
                if (process.env.VUE_APP_ENCRYPT === 'true') {
                    aesData = Crypto.encrypt(aesData)
                }
                config.data = {}
                config.data.p = aesData
                break;
            default:
                break
        }
    }
    return config
}

/**
 * 对响应数据进行处理
 */
function handleResponseData(response: AxiosResponse) {
    if (process.env.VUE_APP_DECRYPT === 'true') {
        let data = response.data
        data = JSON.parse(Crypto.decrypt(data))
        response.data = data
    }
    return response
}
// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 100000,
    timeoutErrorMessage: "请求超时",
})
// 请求超时重新发送
axiosRetry(service, {
    retries: 2,    // 重发次数
    retryDelay: (retryCount) => {
        return retryCount * 1000
    },
    shouldResetTimeout: true,
    retryCondition: (err) => {
        if (err.message.includes('timeout')) {
            return true
        } else {
            return false
        }
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求前做点处理
        if (getToken()) {
            config.headers['Authorization'] = getToken()
        }
        config = handleRequestData(config)
        return config
    },
    (error) => {
        Toast.fail('网络开小差了哦...');
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        response = handleResponseData(response);
        const data = response.data
        const { code } = data
        if (typeof code === 'undefined') {
            return data
        } else {
            switch (code) {
                case STATUS_CODE.SUCCESS:
                    return data;
                default:
                    handleError(data)
                    break;
            }
        }
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)

export default service










