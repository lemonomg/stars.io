import { getToken, setToken } from '@/utils/auth'
import { ActionTree, MutationTree } from 'vuex'
import { UserAction } from '@/api/interface'

import Http from '@/http'
import { UserReponse, UserInfo } from '@/models/user.model'
import { getLocaStorage, setLocaStorage } from '@/utils'

const http = new Http()

const state: UserReponse = {
    token: getToken() as string,
    userInfo: getLocaStorage('STARS_USER_INFO')
}

const getters = {
    token: (state: UserReponse) => state.token,
    userInfo: (state: UserReponse) => state.userInfo
}

const mutations: MutationTree<any> = {
    SET_TOKEN: (state: UserReponse, token: string) => {
        state.token = token
    },
    SET_USER_INFO: (state: UserReponse, userInfo: UserInfo) => {
        state.userInfo = userInfo
        setLocaStorage('STARS_USER_INFO', userInfo)
    }
}

const actions: ActionTree<any, any> = {
    // 登录
    async login({ commit }, userInfo: object) {
        return new Promise((resolve, reject) => {
            http.Post(UserAction.LOGIN, userInfo).then((res: UserReponse) => {
                setToken(res.token)
                commit('SET_TOKEN', res.token)
                commit('SET_USER_INFO', res.userInfo)
                resolve(res)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}

