import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsLoading from "../Components/IsLoading";
import "../Styling/Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthSlice";
import { AuthContext } from "../Context/AuthContext";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { setUser: setAuthUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");


    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log("res", res);
      const { token, user } = res.data;
      console.log("token, user: ", token, user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser({ token, user }));
      setAuthUser(user);


let route = "/";
      switch (user.role) {
        case "admin":
          route = "/admin-dashboard";
          break;
        case "doctor":
          route = "/doctor-dashboard";
          break;
        case "nurse":
          route = "/nurse-dashboard";
          break;
        case "receptionist":
          route = "/r-dashboard";
          break;
        case "matron":
          route = "/matron-dashboard";
          break;
        default:
          route = "/patients-dashboard";
      }



      setTimeout(() => {
        setIsLoading(false);
        navigate(route);
      }, 1500);

      //   navigate(`/${user.role}-dashboard`);
    } catch (err) {
      console.error("Log in error: ", err)
      setIsLoading(false);

      setError("Invalid credentials or server error 😬");
    }
  };

  if (isLoading) return <IsLoading />;

  return (
    <div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Log in to continue to MedicaHub</p>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <div className="password-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* <span onclick="togglePassword()" class="toggle">Show</span> */}
          </div>
          <button className="login-btn" type="submit">
            Log In
          </button>
          <a href="#" className="forgot">
            Forgot Password?
          </a>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
