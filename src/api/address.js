import request from "@/config/request";

export function GetAddressList() {
    return request({
        url: '/user/addressList',
        method: 'get',
    })
}
export function GetAddressDefault() {
    return request({
        url: '/user/addressDefault',
        method: 'get',
    })
}
export function GetAddressById(id) {
    return request({
        url: '/user/addressById/' + id,
        method: 'get',
    })
}
export function SaveAddress(data) {
    return request({
        url: '/user/saveAddress',
        method: 'post',
        params: { data }
    })
}
export function DelAddress(id) {
    return request({
        url: '/user/delAddress',
        method: 'post',
        data: id
    })
}