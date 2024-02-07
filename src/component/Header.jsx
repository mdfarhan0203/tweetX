import React from "react";
import "./component.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg static-top position-fixed w-100">
        <div className="container">
          <Link to="/">
            <div className="navbar-brand" style={{color:"#D63484", fontWeight:"600" }}><h5>TweetX</h5></div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <Link to="/feed">
                <li className="nav-item" style={{textDecoration:"none"}}>
                  <div className="nav-link active" aria-current="page" style={{color:"#495E57", fontWeight:"600" }}>
                    Feed
                  </div>
                </li>
              </Link>
              <Link to="/users" style={{textDecoration:"none"}}>
                <li className="nav-item">
                  <div className="nav-link" style={{color:"#495E57", fontWeight:"600" }}>Users</div>
                </li>
              </Link>
              <Link to="/profile" style={{textDecoration:"none"}}>
                <li className="nav-item">
                  <div className="nav-link" style={{color:"#495E57", fontWeight:"600"}}>Profile</div>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
