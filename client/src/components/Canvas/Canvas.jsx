import { useEffect } from "react";
import "./Canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import { useRef } from "react";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectHandler = () => {};
  return (
    <div className="canvas">
      <Modal show={true} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Form.Control
          type="text"
          placeholder="Ваше Имя"
          style={{ margin: "0.8rem 1rem", width: "auto" }}
        />
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
