const express =  require('express')
const app = express()
const WSServer = require('express-ws')(app)

const PORT = process.env.PORT || 5001

app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО ');

    ws.send('Ты успешно подключился')
    ws.on('message', (msg) => {
        console.log(msg);
    })
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
 