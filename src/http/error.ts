// 处理错误
import { AxiosResponse } from 'axios'
import { STATUS_CODE } from "@/api";
import { removeToken } from '@/utils/auth'
import { Toast } from 'vant'

export const errorLog = (err: Error) => {
    Toast.fail(err.message)
    throw new Error(err.message)
}
function errorCreat(msg: string) {
    const err = new Error(msg)
    errorLog(err)
}
export const handleError = (response: AxiosResponse) => {
    const res = response.data
    const { code } = res //获取后端返回的 code
    // 根据这个code来判断
    switch (code) {
        // Token 过期
        case STATUS_CODE.TOKEN_OVERDUE:
            Toast.fail(res.msg)
            removeToken()
            break;
        case STATUS_CODE.ERROR:
            Toast.fail(res.msg)
            break;
        default:
            errorCreat(res.msg)
            break;
    }

}

