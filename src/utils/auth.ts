import cookie from 'js-cookie'

const TOKEN_KEY = "SGIN_TOKEN"

export function setToken(val: string): void {
    cookie.set(TOKEN_KEY, val, { expires: 3 })
}

export function getToken() {
    return cookie.get(TOKEN_KEY);
}

export function removeToken() {
    cookie.remove(TOKEN_KEY)
}