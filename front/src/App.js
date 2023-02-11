import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Navbar from "./Navbar";
import Home from "./Components/Home";

import $ from "jquery";
import Popper from "popper.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PoiDetail from "./Components/PoiDetail";
import UpdatePoi from "./Components/UpdatePoi";
import AddPoi from "./Components/AddPoi";

window.$ = $;
window.Popper = Popper;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/ajouter" element={<AddPoi />}></Route>
            <Route path="/modifier/:id" element={<UpdatePoi />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
