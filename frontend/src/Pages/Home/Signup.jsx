import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/input/PasswordInput";
import { ValidateEmail } from "../../Components/Controller/Helper";
import axiosInstance from "../../Components/Controller/axiosInstance";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //signup function
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("please enter your name");
      return;
    }
    if (!ValidateEmail(email)) {
      setError("please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }

    setError("");
// fetch api for signup
    try {
      const response = await axiosInstance.post("/api/users/register", {
        name,
        email,
        password,
      });

      if (response.data) {
        navigate("/login"); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fixed  d-flex flex-coloumn  vh-100 justify-content-center  align-items-center ">
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary  rounded  bg-white ">
        <form onSubmit={handleSignUp}>
          <h4 className="fw-bold mt-2">SignUp</h4>

          <div className="border bg-white   mb-3 mt-5 h3 me-2 border-success w-100">
            <input
              type="text"
              placeholder="Name"
              className="  mt-1 pt-1 w-100 h-25   ps-1   mb-1 fs-6  bg-white  border-0"
              style={{ outline: "none" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="border bg-white  w-100 mt-2 mb-3 h3 me-2 border-success w-100">
            <input
              type="text"
              placeholder="Email"
              className="  mt-1 pt-1 w-100 h-25  ps-1  mb-1  fs-6   border-0"
              style={{ outline: "none" }}
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className=" border   mb-3 bg-white h3 me-2 border-success w-100">
            <PasswordInput
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />{" "}
          </div>
          {error && <p className="text-danger fs-6 pb-1">{error}</p>}

          <button
            type="submit"
            className="bg-success fs-5 text-white fst-italic w-100 rounded mt-4"
          >
            Create Account
          </button>
          <br />
          <p className="fst-italic mt-1">
            Already have an account?{""}
            <Link to="/Login" className="fst-italic text-decoration-none">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
