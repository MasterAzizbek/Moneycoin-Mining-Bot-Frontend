import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyReward from "./components/DailyReward";
import Nevbar from "./components/Nevbar";
import Home from "./components/Home";
import { DataProvider } from "./context/context";
import Tasks from "./components/Tasks";
import Invites from "./components/Invites";
import Wallet from "./components/Wallet";
import Loader from "./components/Loader";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App">
          <Loader />
          <div className="app_top">
            <DailyReward />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/invite" element={<Invites />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
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
