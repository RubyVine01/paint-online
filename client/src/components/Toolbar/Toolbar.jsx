import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import Rect from "../../tools/Rect";
import "./Toolbar.scss";

const Toolbar = () => {
  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    console.log(dataUrl);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionId + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn toolbar__btn_brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_rect"
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></button>
      <input
        onChange={(e) => toolState.setFillColor(e.target.value)}
        className="toolbar__color-input"
        type="color"
      />
      <button
        className="toolbar__btn  toolbar__btn_undo"
        onClick={() => canvasState.undo()}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_redo"
        onClick={() => canvasState.redo()}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_save"
        onClick={() => download()}
      ></button>
    </div>
  );
};

export default Toolbar;
