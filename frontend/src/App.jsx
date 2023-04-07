import { useState, useEffect } from "react";
import supabase from "./api/supabase";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth, setAuth } = useAuth();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuth(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuth(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   async function getUser() {
  //     const { data, error } = await supabase.auth.admin.getUserById(1);
  //   }
  //   getUser();
  // }, []);

  // console.log("session", auth);

  return (
    <html data-theme="dark">
      <div className="App">
        <Toaster />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </div>
    </html>
  );
}

export default App;
