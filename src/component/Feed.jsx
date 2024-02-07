import React, { useState, useEffect } from "react";
import "./component.css";
import {
  fetchCurrentUserData,
  fetchUserDataById,
  fetchAllUserDataDB,
  imgURL
} from "../firebase/commanFun";
import {
  addCurrentUser,
  addFollowingUsers,
  addOtherUser,
} from "../redux/user/userSlice";

import Header from "./Header";
import Post from "../ProfilePage/Post";
import { auth, db } from "../firebase/fire";
import {
  ref,
  get,
  set,

} from "firebase/database";
import { useDispatch } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");

  //Get user Data
  const fetchCurrentUser = async () => {
    try {
      let userData = await fetchCurrentUserData();
      if (userData) {
        dispatch(addCurrentUser(userData));
        let following = userData.followers;
        const uid = localStorage.getItem("auth-key");
        let otherFollowing = following?.filter((item) => item !== uid);
        console.log(otherFollowing);
        if (otherFollowing?.length > 0) {
          const followingUserData = await Promise.all(
            otherFollowing.map((item) => fetchUserDataById(item))
          );
          dispatch(addFollowingUsers(followingUserData));
          // setFollowingUserData(followingUserData);
        }
        if (otherFollowing?.length == 0) {
          dispatch(addFollowingUsers([]));
        }

        ///Fetch Other user Data
        let allUsers = await fetchAllUserDataDB();
        console.log(allUsers);
        if (allUsers) {
          const uid = localStorage.getItem("auth-key");
          let otheruserData = allUsers?.filter(
            (item) => item?.userInfo?.userId !== uid
          );
          console.log(otheruserData);
          dispatch(addOtherUser(otheruserData));
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  useEffect(() => {
    fetchCurrentUser();
    console.log("Feeds");
  }, []);

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = localStorage.getItem("auth-key");
      const currentUserRef = ref(db, `usersInfo/${currentUser}/user`);
      const currentUserSnapshot = await get(currentUserRef);
      const currentUserData = currentUserSnapshot.val() || {
        tweets: [],
      };

      currentUserData.tweets = currentUserData.tweets || [];
      console.log("BEFORE", currentUserData);
      const cleanCurrentUserData = JSON.parse(JSON.stringify(currentUserData));
      // time 
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      const newTweet = {
        author: cleanCurrentUserData?.userInfo?.name || "",
        id: currentUser || "",
        imgURL,
        message: postContent,
        timeStamp: time,
      };

      cleanCurrentUserData.tweets.push(newTweet);
      await set(currentUserRef, cleanCurrentUserData);

      const updatedCurrentUserData = await get(currentUserRef);
      console.log("Updated Current User Data:", updatedCurrentUserData.val());
      setPostContent("");
    } catch (error) {
      console.error("Error updating user's tweets:", error);
    }
  };

  // console.log(followingUserData);
  return (
    <div className="feed-container">
      <div>
        <Header />
      </div>
      <div className="w-50 h-100 m-auto" style={{ marginTop: "5rem" }}>
        <div>
          <button
            style={{ marginTop: "5rem", background: "#D63484", width: "10rem" }}
            type="button"
            className="btn btn-primary  mt-100 position-fixed"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Tweet
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  TweetX
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea
                    placeholder="Enter Your Tweet"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={postContent}
                    onChange={handleContentChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                  style={{ background: "#D63484" }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <Post />
      </div>
    </div>
  );
};
export default Feed;
