import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import supabase from "../api/supabase";

// import axios from "../api/axios";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [school, setSchool] = useState("");

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      cfmPassword === ""
    )
      return toast.error("Please fill in all required fields!");

    if (password !== cfmPassword)
      return toast.error("Password and Confirm Password must be the same");

    if (password.length < 8)
      return toast.error("Password must be at least 8 characters long!");

    // const hashedPassword = await bcrypt.hash(password, 12);

    const institute = school || null;

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true,
        password: password,
        user_metadata: { username: username, institute: institute },
      });

      //   const { error } = await supabase.from("user").insert({
      //     username: username,
      //     email: email,
      //     password: hashedPassword,
      //     institute: institute,
      //   });

      if (error) throw error;

      // console.log(data);
      toast.success("Your account has been successfully created!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
    }
    // console.log(username, password, cfmPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-1/3 card bg-neutral text-neutral-content"
        onSubmit={onHandleSubmit}
      >
        <div className="items-center text-center card-body">
          <div className="card-actions">
            <button
              className="absolute btn btn-square btn-sm top-8 left-8"
              onClick={() => navigate("/login")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="card-title">Register</h2>
          </div>

          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">Username *</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">E-mail *</span>
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
              <span className="label-text">Password *</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">Confirm Password *</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="w-full max-w-xs input input-bordered"
              value={cfmPassword}
              onChange={(e) => setCfmPassword(e.target.value)}
            />
          </div>
          <div className="divider"></div>
          <div className="w-full max-w-xs form-control">
            <label className="label">
              <span className="label-text">Educational Institute</span>
            </label>
            <input
              type="text"
              placeholder="Optional"
              className="w-full max-w-xs mb-10 input input-bordered"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>

          <div className="justify-center w-full card-actions">
            <button className="w-2/3 btn btn-info">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
