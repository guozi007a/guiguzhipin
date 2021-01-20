const { ChatModel } = require('../db/models.js')

module.exports = function (server) {
    // 得到IO对象
    const io = require('socket.io')(server)
    // 监视连接, 当有一个客户连接上时 回调
    io.on('connection', function(socket) {
        console.log('socketio connected')
        // 绑定sendMSG监听 ， 接收客户端发送的消息
        socket.on('sendMsg', function({ from, to, content }) {
            console.log('服务器接收到浏览器的消息', { from, to, content })
            // 准备要保存的数据
            const chat_id = [from, to].sort().join('_')
            const create_time = Date.now()
            // 处理数据，保存消息
            new ChatModel({ from, to, content, chat_id, create_time }).save((err, chatMsg) => {
                // 向所有连上的客户端发消息
                    io.emit('receiveMsg', chatMsg)
            })
        })
    })
}
