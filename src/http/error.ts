// 处理错误
import { STATUS_CODE } from "@/api";
import { removeToken } from '@/utils/auth'
import { AxiosResponse } from "axios";
import { Toast } from 'vant'

export const errorLog = (err: Error) => {
    err.message = "网络开小差了"
    Toast.fail(err.message)
    throw new Error(err.message)
}
function errorCreat(msg: string) {
    const err = new Error(msg)
    errorLog(err)
}
export const handleError = (response: AxiosResponse) => {
    const { code, msg } = response.data //获取后端返回的 code
    // 根据这个code来判断
    switch (code) {
        // Token 过期
        case STATUS_CODE.TOKEN_OVERDUE:
            Toast.fail(msg)
            removeToken()
            break;
        case STATUS_CODE.ERROR:
            if (msg !== "") {
                Toast.fail(msg)
            }
            return response.data
        default:
            errorCreat(msg)
            break;
    }

}

