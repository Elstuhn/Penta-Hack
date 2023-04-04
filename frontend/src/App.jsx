import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const supabase = createClient(
  "https://cwoqhbnsiqcvlwypmeaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3b3FoYm5zaXFjdmx3eXBtZWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODY5ODcsImV4cCI6MTk5NjE2Mjk4N30.9OTliAVhZWiJci3r9W_CR8ORBzL2GSg3WtmnW2FumlQ"
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
