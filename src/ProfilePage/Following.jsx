import React, { useEffect, useState } from "react";
import Profile from "../component/Profile";
import { fetchCurrentUserData ,fetchUserDataById,imgURL} from "../firebase/commanFun";
import { getFollowingUsersData } from "../redux/user/userSlice";
import { useSelector } from "react-redux";



const followers = () => {
  const followingData = useSelector(getFollowingUsersData)
  const [otherUsers, setOtherUsers] = useState([]);

  const fetchCurrentUser = async() => {
    try {
      let userData = await fetchCurrentUserData();
      if (userData) {
        const followingData = await Promise.all(
          userData.following.map((item) => fetchUserDataById(item))
        );
        const uid = localStorage.getItem("auth-key");
        const filteredFollowingData = followingData.filter(
          (data) => data !== null && data.userInfo.userId !== uid
        );
        setOtherUsers(filteredFollowingData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
    useEffect(() => {
      fetchCurrentUser();
      console.log("fetch current user Data");
    }, [followingData]);
  


  return (
    <div>
       <Profile />
      <div className="h-100 m-auto" style={{width:"52%"}}>
      {otherUsers.length == 0 && <h3 style={{marginLeft:"1rem"}}>No Following</h3>}
        {otherUsers.length > 0 && otherUsers?.map((item) => {
          const {name,userID}  = {...item.userInfo}
          return (
            <div className="row w-100" key={userID}>
              <div className="col-md-6 col-lg mt-3">
                <div className="card custom-card" style={{marginLeft:"1rem"}}>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={imgURL}
                        className="img-fluid rounded-start"
                        alt="User Image"
                        style={{height:"7rem"}}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex justify-content-between">
                        <div className="card-title d-flex  justify-content-around ">
                          <h5>{name}</h5>
                          <h5>{item.timeStamp}</h5>
                        </div>
                        <div>
                          <p className="card-text">
                            <button style={{width:"8rem", height:"2.1rem",border:"none",borderRadius:"10px",background:"#FFF7F1",color:"black",fontWeight:"400"}}>Following</button>
                          </p>
                      </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
export default followers;
