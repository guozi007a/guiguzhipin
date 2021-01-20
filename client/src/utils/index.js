/*
包含n个工具函数的模块
*/
/*
redirectTo的四种情况：
1，用户主界面路由
    1.1 dashen: /dashen
    1.2 laoban: /laoban
2，用户信息完善界面路由
    2.1 dashen: /dasheninfo
    2.2 laoban: /laobaninfo

怎么判断用户已经完善了信息呢？
就看user.header是否有值。 有值，就说明用户已经完善了信息。
用户的类型是user.type
*/
// 定义一个函数，来获取redirectTo的值
export function getRedirectTo(type, header) {
    let path 
    if (type === 'laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    if (!header) {
        path += 'info'
    }
    return path
}
