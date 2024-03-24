let messages = []

const chatSocket = async (socketServer) => {
    socketServer.on('connection', (socket) => {
        console.log('Chat socket conectado')

        socket.on('message', (chatData) => {
        messages.push(chatData)
        socketServer.emit('chat', messages)
        })
    })
}

export default chatSocket