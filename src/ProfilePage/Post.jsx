import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getFollowingUsersData,
  getCurrentUserInfo,
  addFollowingUsers,
} from "../redux/user/userSlice";
import { fetchUserDataById ,imgURL} from "../firebase/commanFun";
import { useDispatch } from "react-redux";

const Post = () => {
  const dispatch = useDispatch();
  // const followinUsersPosts = useSelector(getFollowingUsersData);
  const currentUserData = useSelector(getCurrentUserInfo);
  const [followingData, setFollowingData] = useState([]);
  let [followingId, setFollowingId] = useState(currentUserData?.following);

  async function fetchfollowingData() {
    const uid = localStorage.getItem("auth-key");
    followingId = followingId?.filter(item=>item !== uid)
    if (followingId?.length > 0) {
      
      const followingUserData = await Promise.all(
        followingId?.map((item) => fetchUserDataById(item))
      );
      dispatch(addFollowingUsers(followingUserData));
      setFollowingData(followingUserData);
    }
  }

  useEffect(() => {
    fetchfollowingData();
    console.log("post first time")
  }, []);

  return (
    <div className="all-poster">
      {followingData?.length > 0 &&
        followingData?.map((item) => {
          return item?.tweets?.map((data,index)=> {
            const { author, id, message, timeStamp ,imgURL } = { ...data };
            return (
              <div className="row w-100" >
                <div className="col-md-6 col-lg">
                  <div className={`card custom-card ${index == 0 ?"first-childred-card":"other-children-card"}`}>
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={imgURL}
                          className="img-fluid rounded-start"
                          alt="User Image"
                          style={{ height: "7rem" ,borderRadius:"50%"}}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="card-title d-flex  justify-content-around">
                            <h5>{author}</h5>
                            <h5>{timeStamp}</h5>
                          </div>
                          <div>
                            <p className="card-text">{message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })}
    </div>
  );
};
export default Post;
