import React, { useState, useEffect } from "react";
import "../component/component.css"
import Header from "./Header";
import { Link } from "react-router-dom";
import { fetchCurrentUserData,imgURL } from "../firebase/commanFun";
import { getCurrentUserInfo } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  // get all auther post and  list out
  const [currentUser, setCurrentuser] = useState([]);
  const currentUserData = useSelector(getCurrentUserInfo)
  // console.log(currentUserData.userInfo);
  // async function getCurrentUser() {
  //   let userData = await fetchCurrentUserData();
  //   if (userData) {
  //     setCurrentuser(userData);
  //     console.log("userData", userData);
  //   }
  // }
  useEffect(() => {
    // getCurrentUser();
  }, [currentUserData]);

  console.log("userData", currentUserData);
  // console.log(userInfo);

  let {userInfo, following, tweets,followers} ={...currentUserData}
   ///filter before fetching Data
   const uid = localStorage.getItem("auth-key");
  following = following?.filter((item)=>item !==uid)
  followers =following?.filter((item)=>item !==uid)
  // console.log(userInfo);
  // console.log(following);
  // console.log(tweets);
  // console.log(followers);

  const { name } = { ...userInfo};
  // const {followers}
  const followerData = currentUser?.followers
  console.log("following",following);
  // console.log("followers",followers?.length);
  // console.log("following",following?.length);
  // console.log("tweets",tweets?.length);

  return (
    <div className="user">
      <Header />
      <div className="w-50 h-100 m-auto">
        <div className="row w-98">
          <div className="col-md-6 col-lg mt-5">
            <div className="card custom-card">
              <div className="row">
                <div className="col-md-4">
                  <img
                  src={imgURL}
                    className="img-fluid rounded-start"
                    alt="User Image"
                    style={{ height: "7rem" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="card-title">
                      <h3 style={{color:"blue"}}>{name}</h3>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6 className="card-text">Post :  {tweets?.length}</h6>
                      <h6 className="card-text">Followers :  {following?.length}</h6>
                      <h6 className="card-text">Following: {followers?.length}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* } */}

        <div className="navbar-data">
          <ul
            className="navbar-nav d-flex  justify-content-around "
            style={{
              backgroundColor: "#E1F0DA",
              display: "flex",
              flexDirection: "row",
            }}
            id="navbarNav"
          >
            <Link to="/author-post" className="profile_link">
              <li className="nav-item p-2x  ">
                <div className="nav-link" href="#">
                  <h6>Post</h6>
                </div>
              </li>
            </Link>
            <Link to="/follower" className="profile_link">
              <li className="nav-item">
                <div className="nav-link" href="#">
                  Followers
                </div>
              </li>
            </Link>

            <Link to="/following" className="profile_link">
              <li className="nav-item">
                <div className="nav-link" href="#">
                  Following
                </div>
              </li>
            </Link>
          </ul>
        </div>
        {/* <div></div> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default Profile;
