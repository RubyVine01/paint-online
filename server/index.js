const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5001;

app.ws("/", (ws, req) => {
  console.log("ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО ");

  ws.send("Ты успешно подключился");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHendler(ws, msg);
        break;
        case "draw":
        connectionHendler(ws, msg);
        break;
    }
  });
});

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const connectionHendler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
