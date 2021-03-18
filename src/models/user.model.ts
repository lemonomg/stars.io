export type UserInfo = {
    _id: number,
    nickname: string,
    avatar: string,
    email: string,
    account: string
    group: number
}
export interface UserReponse {
    token: string
    userInfo: UserInfo
}