import "./Toolbar.scss";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button className="toolbar__btn toolbar__btn_brush"></button>
      <button className="toolbar__btn  toolbar__btn_color"></button>
      <button className="toolbar__btn  toolbar__btn_figure"></button>
      <button className="toolbar__btn  toolbar__btn_eraser"></button>
      <button className="toolbar__btn  toolbar__btn_line"></button>
      <input className="toolbar__color-input" type="color" />
      <button className="toolbar__btn  toolbar__btn_back"></button>
      <button className="toolbar__btn  toolbar__btn_next"></button>
      <button className="toolbar__btn  toolbar__btn_save"></button>
    </div>
  );
};

export default Toolbar;
