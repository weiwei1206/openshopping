import request from "@/config/request";


export function GetMyOrder() {
    return request({
        url: '/myOrder',
        method: 'get',
    })
}
export function GetOrderAfterSale() {
    return request({
        url: '/afterSale',
        method: 'get',
    })
}
export function GetOrderGoodsById(id) {
    return request({
        url: '/orderGoodsById',
        method: 'get',
        params: { id }
    })
}
export function SubmitOrder(data) {
    return request({
        url: '/products/submitOrder',
        method: 'post',
        data: data
    })
}