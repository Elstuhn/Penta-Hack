import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
