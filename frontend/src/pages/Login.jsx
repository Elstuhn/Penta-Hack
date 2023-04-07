import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import axios from "../api/axios";
// import useRefreshToken from "../hooks/useRefreshToken";
import toast from "react-hot-toast";
import supabase from "../api/supabase";

function Login() {
  const { auth, setAuth } = useAuth();
  //   const refresh = useRefreshToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth?.user) navigate("/");
  });

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      // console.log(data);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    }
    // console.log(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-1/3 card bg-neutral text-neutral-content"
        onSubmit={onHandleSubmit}
      >
        <div className="items-center text-center card-body">
          <h2 className="card-title">Login</h2>

          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="w-full max-w-xs mb-5 input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="justify-center w-full card-actions">
            <button className="w-2/3 btn btn-primary">Login</button>
          </div>
          <div className="divider"></div>

          <button
            className="w-2/3 btn btn-info"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
