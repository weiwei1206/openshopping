import request from "../config/request";
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data
    })
}

export function GetUser() {
    return request({
        url: '/user',
        method: 'get',
    })
}

export function GetFavorite(data) {
    return request({
        url: '/favorite',
        method: 'get',
        params: { data }
    })
}

export function DelFavorite(id) {
    return request({
        url: '/favorite',
        method: 'post',
        data: id
    })
}

export function GetAddressList() {
    return request({
        url: '/User/GetAddressList',
        method: 'get',
    })
}

export function GetAddressById(id) {
    return request({
        url: '/User/GetAddressById',
        method: 'get',
        params: { id }
    })
}





export function GetCoupon(data) {
    return request({
        url: '/coupon',
        method: 'get',
        params: { data }
    })
}

export function ExchangeCoupon(code) {
    return request({
        url: '/exchangeCoupon',
        method: 'Post',
        params: { code: code }
    })
}