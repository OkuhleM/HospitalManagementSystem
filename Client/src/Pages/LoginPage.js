import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsLoading from "../Components/IsLoading";
import '../Styling/Login.css'

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log("submitted");
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log("res", res);
      const { token, user } = res.data;
      console.log("token, user: ",token, user)
      

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        setIsLoading(false);
        navigate("/r-dashboard");
      }, 1500);

      //   navigate(`/${user.role}-dashboard`);
    } catch (err) {
      setIsLoading(false);

      setError("Invalid credentials");
    }
  };

  if (isLoading) return <IsLoading />;

  return (
    <div>
      <div className="login-container">
        <form className="login-form">
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
          <button onClick={handleSubmit} className="login-btn">Log In</button>
                <a href="#" className="forgot">Forgot Password?</a>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
