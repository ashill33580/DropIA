import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AI from "./pages/AI";
import Products from "./pages/Products";
function App(){
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/ai">Assistant IA</Link> | <Link to="/products">Produits</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
