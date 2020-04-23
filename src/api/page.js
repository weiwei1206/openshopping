import request from "../config/request";


export function GetPage() {
    return request({
        url: '/getPage',
        method: 'get',
    })
}
export function GetTopn() {
    return request({
        url: '/products/topn',
        method: 'get',
    })
}
//轮播图
export function getSwipeImg() {
    return request({
        url: '/products/swipeImg',
        method: 'get',
    })
}