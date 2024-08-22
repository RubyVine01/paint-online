import "./App.scss";

import Canvas from "../Canvas/Canvas";
import SettingBar from "../SettingBar/SettingBar";
import Toolbar from "../Toolbar/Toolbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <Toolbar />
                <SettingBar />
                <Canvas />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Toolbar />
                <SettingBar />
                <Canvas />
                <Navigate to={`/f${(+new Date()).toString(16)}`} replace />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
