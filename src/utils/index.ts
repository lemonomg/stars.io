const util = {
    deep: (params: any) => {// 深拷贝
        if (params === '') { return ''; }
        let obj = {};
        obj = JSON.parse(JSON.stringify(params));
        return obj;
    }
};

export const getLocaStorage = (key: string) => {
    const data = localStorage.getItem(key)
    return typeof data === 'string' ? JSON.parse(data) : null
}

export const setLocaStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const removeLocaStorage = (key: string) => {
    localStorage.removeItem(key)
}

export const getSessionStorage = (key: string) => {
    const data = localStorage.getItem(key)
    return typeof data === 'string' ? JSON.parse(data) : null
}

export const setSessionStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const removeSessionStorage = (key: string) => {
    sessionStorage.removeItem(key)
}

export default util;
