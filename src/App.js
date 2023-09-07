import { Route, Routes } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import Product from "./views/Shop";
import Batafsil from "./views/Batafsil";
import Karzinka from "./views/Karzinka";
import Login from "./views/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Router />} />
        <Route path="/batafsil" element={<Batafsil />} />
        <Route path="/corzinka" element={<Karzinka />} />
      </Routes>
    </div>
  );
}

export default App;
