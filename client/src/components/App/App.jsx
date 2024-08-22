
import "./App.scss";

import Canvas from "../Canvas/Canvas";
import SettingBar from "../SettingBar/SettingBar";
import Toolbar from "../Toolbar/Toolbar";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
