import service from './axios.interceptors'
import { BASE_API } from '@/api'

interface FetchData {
    url: string;
    params: object;
    timestamp: number;
}

class Http {
    private request: any
    constructor() {
        this.request = service
    }
    /**
 * POST 请求
 * @param action 请求
 * @param data 请求参数
 */
    public Post(action: string, data: object, config: object = {}) {
        return this.fetchData('POST', action, data, config)
    }

    /**
     * PUT 请求
     * @param action 请求链接
     * @param data 请求数据
     */
    public Put(action: string, data: object, config: object = {}) {
        return this.fetchData('PUT', action, data, config)
    }

    /**
     * DELETE 请求方式
     * @param action 请求链接
     * @param data 请求参数
     */
    public Delete(action: string, data: object = {}, config: object = {}) {
        return this.fetchData('DELETE', action, data, config)
    }

    /**
     * GET 请求
     * @param action 请求链接 // 去掉域名
     * @param params 请求参数
     */
    public Get(action: string, params: object = {}, config: object = {}) {
        return this.fetchData('GET', action, params, config)
    }

    /**
     * option 请求方式
     * @param option 请求方式 可选值: POST,GET,DELETE,PUT
     * @param action 请求链接
     * @param params 请求参数
     */
    public AjaxFetch(option: string, action: string, params: object, config: object = {}) {
        return this.fetchData(option, action, params, config)
    }
    /**
     * 对数据进行处理
     * @param method 请求方式
     * @param url api地址
     * @param params 请求参数
     * @param config 请求配置
     * @returns 
     */
    private fetchData(method: string, url: string, params: object, config: object) {
        params = params || {}
        const fetchData: FetchData = {
            url,
            params,
            timestamp: Date.now()
        }
        switch (method.toLocaleUpperCase()) {
            case 'GET':
                return this.request(Object.assign(config, {
                    url: `${BASE_API}${url}`,
                    method: method.toUpperCase(),
                    params: fetchData
                }))
            case 'POST':
            case 'PUT':
            case 'DELETE':
                return this.request(Object.assign(config, {
                    url: `${BASE_API}${url}`,
                    method: method.toUpperCase(),
                    data: fetchData
                }))
            default:
                break
        }
    }
}

export default Http