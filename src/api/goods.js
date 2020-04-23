import request from "@/config/request";


export function getGoodDetail(id) {
    return request({
        url: '/products/getGoodDetail/' + id,
        method: 'get',
    })
}

export function getProduct(id) {
    return request({
        url: '/Page/Product',
        method: 'get',
        params: { id }
    })
}