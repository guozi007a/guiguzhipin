/*
能发送ajax请求的函数模块
函数的返回值，是promise对象
ajax有3个参数，url, 请求数据data,请求类型type
*/
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if (type === 'GET') { // 发送GET请求
        // 假设 data: {username: dili, password: 233}
        // 那么 paramStr: usename=dili&password=233
        let paramStr = ''
        // 遍历data中的属性，进行拼接url
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        // 使用axios发送get请求
        return axios.get(url + '?' + paramStr)
    } else { // 发送POST请求
        return axios.post(url, data)
    }
}
