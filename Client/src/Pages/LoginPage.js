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
      const { token, user } = res.data;

      console.log("✅ Login successful:", user);

      // store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // update Redux + Context
      dispatch(setUser({ token, user }));
      setAuthUser(user);

      // get route based on role
      let route = "/";
      switch (user.role?.toLowerCase()) {
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

      console.log(`🚀 Redirecting to: ${route}`);

setTimeout(() => {
  console.log(`🚀 Redirecting to: ${route}`);
  navigate(route, { replace: true });
}, 200);

      // navigate straight away
      // navigate(route, { replace: true });

    } catch (err) {
      console.error("Log in error:", err);
      setError("Invalid credentials or server error 😬");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <IsLoading />;

  return (
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
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Log In
        </button>

        {error && <p className="error">{error}</p>}
        <a href="#" className="forgot">
          Forgot Password?
        </a>
      </form>
    </div>
  );
}

export default LoginPage;