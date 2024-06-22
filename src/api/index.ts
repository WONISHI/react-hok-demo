import https from '../utils/request'
export const getData=()=>{
    return https.request({
        url:'/home/getData',
        method:'get'
    })
}
export const getUserList=(params?:any)=>{
    return https.request({
        url:'/user/getuser/',
        method:'get',
        params
    })
}

export const createUser=(data?:any)=>{
    return https.request({
        url:'/user/createUser/',
        method:'post',
        data
    })
}
export const updateUser=(data?:any)=>{
    return https.request({
        url:'/user/updateUser/',
        method:'post',
        data
    })
}
export const deleteUser=(data?:any)=>{
    return https.request({
        url:'/user/deleteUser/',
        method:'post',
        data
    })
}
export const getMenu=(data?:any)=>{
    return https.request({
        url:'/user/getMenu/',
        method:'post',
        data
    })
}