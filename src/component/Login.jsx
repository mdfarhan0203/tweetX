import React, { useState } from "react";
import "./component.css"; 
import loginImage from "../images/login-image.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInUsingEmailAndPassword} from "../firebase/commanFun";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    showPassword: false,
    error: "",
  });
  const [error, setError] = useState("");

  const handlerChanged = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await signInUsingEmailAndPassword(userData);
      console.log(response);
      if (response) {
        localStorage.setItem("auth-key",response._tokenResponse.localId)
        navigate("/feed");
      }
    } catch (error) {
      console.log();
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setUserData(!userData.showPassword);
  };

  return (
    <div className="signup">
    
      <div className="login d-flex align-items-center justify-content-center vh-100">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-6 login-form">
              <div className="header" style={{ marginTop: "8rem" }}>
                <h2 className="logo-text">TweetX</h2>
                <Link to="/signup">
                  <button className="btn btn-light crate-account mt-3">
                    Create Account
                  </button>
                </Link>
              </div>

              <h3 className="mt-5 mb-3">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handlerChanged}
                    name="email"
                  />
                </div>

                <div className="mb-4">
                  <div className="input-group">
                    <input
                      type={userData.showPassword ? "text" : "password"}
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      value={userData.password}
                      onChange={handlerChanged}
                      name="password"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="input-group-text password-toggle-icon"
                    >
                      {userData.showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                  {error && <h6>{error}</h6>}

                </div>

                <div className="footer-button d-flex justify-content-between mt-3">
                  <div>
                    <button type="button" className="btn btn-link" 
                    // onClick={handlerForgetPwd}
                    >
                      Forget Password?
                    </button>
                  </div>
                  <div className="login-btn" style={{width:"8rem", height:"2.5rem",textAlign:"center", borderRadius:"10px"}}>
                    <button type="submit" className="btn" >
                      <h5 style={{color:"#F8FAE5"}}>Login</h5>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-8 col-lg-8 col-sm-6">
              <img
                src={loginImage}
                alt="login"
                className="img-fluid  login-image"
                style={{height:"40rem"}}
              />
            </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Login;
