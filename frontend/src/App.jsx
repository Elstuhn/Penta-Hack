import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
