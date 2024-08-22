import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Rect from "../../tools/Rect";
import "./Toolbar.scss";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button
        className="toolbar__btn toolbar__btn_brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></button>
      <button
        className="toolbar__btn  toolbar__btn_eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      ></button>
      <button className="toolbar__btn  toolbar__btn_line"></button>
      <input className="toolbar__color-input" type="color" />
      <button className="toolbar__btn  toolbar__btn_back"></button>
      <button className="toolbar__btn  toolbar__btn_next"></button>
      <button className="toolbar__btn  toolbar__btn_save"></button>
    </div>
  );
};

export default Toolbar;
