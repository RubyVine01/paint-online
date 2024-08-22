import toolState from "../../store/toolState";
import "./SettingBar.scss";

const SettingBar = () => {

  return (
    <div className="setting-bar">
      <label style={{ marginLeft: "10px" }} htmlFor="line-width">
        Толщина линии
      </label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        min={1} 
        max={50}
        defaultValue={1}
      />
      <label style={{ marginLeft: "10px" }} htmlFor="stroke-color">
        Цвет контура
      </label>
        <input
        id="stroke-color"
        onChange={(e) =>  toolState.setStrokeColor(e.target.value)} 
        className="toolbar__color-input" 
        type="color"
      />
    </div>
  );
};

export default SettingBar;
