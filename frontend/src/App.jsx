

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


import Home from "./pages/Home";
import Forum from "./pages/Forum";

function App() {

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;