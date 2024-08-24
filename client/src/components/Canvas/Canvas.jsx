import { useEffect, useState } from "react";
import "./Canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import { useRef } from "react";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import Rect from "../../tools/Rect";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5001");
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));

      socket.onopen = () => {
        console.log("Получилось подключиться");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
        socket.onmessage = (event) => {
          let msg = JSON.parse(event.data);
          switch (msg.method) {
            case "connection":
              console.log(`Пользователь ${msg.username} присоединился`);
              break;
            case "draw":
              drawHandler(msg);
              break;
          }
        };
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.fillColor,
          figure.lineWidth,
          figure.strokeColor
        );
        break;
      case "finish":
        ctx.beingPath();
        break;
    }
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectHandler = () => {
    const username = usernameRef.current.value.trim();
    if (!username) {
      setError("Имя не может быть пустым!");
      return;
    }

    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
    setError("");
  };

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Form.Control
          ref={usernameRef}
          type="text"
          placeholder="Ваше Имя"
          style={{ margin: "0.8rem 1rem", width: "auto" }}
        />
        {error && (
          <p style={{ color: "red", marginLeft: "1.375rem" }}>{error}</p>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        width={600}
        height={400}
        ref={canvasRef}
      />
    </div>
  );
});
export default Canvas;
