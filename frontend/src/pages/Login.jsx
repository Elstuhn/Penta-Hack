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
      console.log(data);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid username or password");
    }
    console.log(email, password);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="card w-1/3 bg-neutral text-neutral-content"
        onSubmit={onHandleSubmit}
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="card-actions w-full justify-center">
            <button className="btn btn-primary w-2/3">Login</button>
          </div>
          <div className="divider"></div>

          <button
            className="btn btn-info w-2/3"
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
