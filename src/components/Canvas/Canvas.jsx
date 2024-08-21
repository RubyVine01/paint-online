import { useEffect } from "react";
import "./Canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import { useRef } from "react";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);
  return (
    <div className="canvas">
      <canvas width={600} height={400} ref={canvasRef}></canvas>
    </div>
  );
});
export default Canvas;
