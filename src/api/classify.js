import request from "@/config/request";

//获取全部分类
export function getClass() {
    return request({
        url: '/products/getClass',
        method: 'get',
    })
}
//获取分类下的产品
export function getClassGoods(sid) {
    return request({
        url: '/products/getClassGoods/' + sid,
        method: 'get',
    })
}