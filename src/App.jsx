import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyReward from "./components/DailyReward";
import Nevbar from "./components/Nevbar";
import Home from "./components/Home";
import { DataProvider } from "./context/context";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App">
          <div className="app_top">
            <DailyReward />
            <Home />
          </div>
          <div className="app_bottom">
            <Nevbar />
          </div>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
