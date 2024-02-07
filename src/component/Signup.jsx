import React, { useState } from "react";
import "./component.css";
import loginImage from "../images/login-image.png";
import { Link } from "react-router-dom";
import {
  writeUserData,
  signupUsingEmailAndPassword,
} from "../firebase/commanFun";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      isPasswordSame: false,
    }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      console.log("Form Data:", formData);
      const { password, confirmPassword, name } = formData;
      if (password !== confirmPassword) {
        setFormData((prevData) => ({
          ...prevData,
          isPasswordSame: true,
        }));
        return;
      } else {
        let response = await signupUsingEmailAndPassword(formData);
        if (response) {
          localStorage.setItem("userName", name);
          await writeUserData(response.uid, formData);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="signup">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-4 col-lg-4 col-sm-6 login-form">
            <div className="header">
              <h2 className="mt-1">TweetX</h2>
              <Link to="/">
                <button
                  className="btn btn-light login-button mt-2"
                  style={{
                    width: "10rem",
                    color: "#000000",
                    fontWeight: "600",
                    background: "#F5F7F8",
                  }}
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="mt-5">
              <h3>Create Account</h3>
              <form onSubmit={handleSignup} className="mt-5">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                {error && <h5>{error}</h5>}
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ background: "#D63484" }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-8 col-lg-8 col-sm-6 login-image">
            <img
              src={loginImage}
              alt="login"
              className="img-fluid"
              style={{ height: "35rem", border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
