
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/input/PasswordInput";
import { ValidateEmail } from "../../Components/Controller/Helper";
import axiosInstance from "../../Components/Controller/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post("api/users/login", {
        email: email,
        password: password,
      });

      console.log('Response:', response);

      // Handle successful login response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/mainpage");
      }
    } catch (error) {
      console.log('Error:', error);

      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } 
      else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fixed d-flex flex-column vh-100 justify-content-center align-items-center">
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <form onSubmit={handleLogin}>
          <p className="fw-bold display-6 text-success fst-italic mt-2 mb-4 justify-content-center fw-bold mb-2">
            Login
          </p>
          <div className="border mt-4 h3 bg-white me-2 py-1 border-success w-100 mb-1">
            <input
              type="text"
              id="name"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-100 fs-6 bg-white border-0"
              style={{ outline: "none" }}
            />
          </div>
          <div className="border mt-2 h3 me-2 border-success w-100 mb-3 bg-white">
            <PasswordInput
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger fs-6 pb-1">{error}</p>}
          <button
            type="submit"
            className="bg-success mt-1 w-75 fw-bold text-white fst-italic pb-2 mb-1 rounded"
            style={{ border: "none" }}
          >
            Login
          </button>
          <br />
          <p className="fst-italic h6 mt-2">
            Not registered yet?{" "}
            <Link to="/Signup" className="fst-italic text-decoration-none">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
