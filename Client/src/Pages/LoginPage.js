import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsLoading from "../Components/IsLoading";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => {
//     setShowPassword(prev => !prev);
//   };

  console.log("formData", formData);


const handleSubmit = async (e) => {
    e.preventDefault();
     setIsLoading(true);
    setError("");
console.log('submitted')
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log('res', res)
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => {
        setIsLoading(false);
    navigate("/dashboard")
      }, 1500);

      // Redirect based on role
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
        <form>
          <h3>Log In</h3>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
          
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Log In</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
