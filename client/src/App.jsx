import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Fail from "./pages/Fail";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
