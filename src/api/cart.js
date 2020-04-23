import request from "@/config/request";


export function GetCart() {
    return request({
        url: '/products/getcart',
        method: 'get',
    })
}
export function AddCart(data) {
    return request({
        url: '/products/addCart',
        method: 'post',
        data: data
    })
}

export function RemoveCart(goods_ids) {
    return request({
        url: '/products/removeCart',
        method: 'post',
        data: goods_ids
    })
}