import { useEffect, useState } from "react";
import "./component.css";
import Header from "./Header";
import { push, set, ref, onValue, update, get } from "firebase/database";
import { auth, db } from "../firebase/fire";
import { useSelector } from "react-redux";
import { fetchAllUserDataDB, imgURL } from "../firebase/commanFun";
import { getOtherUser } from "../redux/user/userSlice";
import {
  addCurrentUser,
  addOtherUser,
  addFollowingUsers,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getCurrentUserInfo } from "../redux/user/userSlice";

const Users = () => {
  let otherUsersData = useSelector(getOtherUser);
  console.log(otherUsersData)
  const uid = localStorage.getItem("auth-key");
  otherUsersData = otherUsersData.filter((data)=>data?.userInfo?.userId != uid)
  const currentData = useSelector(getCurrentUserInfo);
  const [allUsers, setAllUser] = useState([]);
  const [followingUsers, setFollowingUsers] = useState(currentData.following);
  console.log("followingUsers", followingUsers);
  const dispatch = useDispatch();

  // async function fetchAllusers(){
  //   let allUsers= await fetchAllUserDataDB()
  //   if(allUsers){
  //     console.log(allUsers)
  //   }

  // }

  // ========================================================================================================================

  // List all the user
  // current users
  //add follow uand unfollow feature

  const fetchData = async () => {
    try {
      const data = fetchAllUserDataDB();
      console.log("kkk", data);
      if (data) {
        // const newData = Object.values(data).map((item) => item.user);
        dispatch(addOtherUser(data));
        // console.log(newData);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("user First time");
  }, []);

  const handleFollow = async (userId) => {
    try {
      const isFollowing = followingUsers?.includes(userId);
      setFollowingUsers((prevFollowing) =>
        isFollowing
          ? prevFollowing.filter((id) => id !== userId)
          : [...prevFollowing, userId]
      );

      const uid = localStorage.getItem("auth-key");
      const currentUserRef = ref(db, `usersInfo/${uid}/user`);
      const otherUserRef = ref(db, `usersInfo/${userId}/user`);

      const [currentUserSnapshot, otherUserSnapshot] = await Promise.all([
        get(currentUserRef),
        get(otherUserRef),
      ]);

      const currentUserData = currentUserSnapshot.val() || {
        following: [],
        followers: [],
      };
      const otherUserData = otherUserSnapshot.val() || {
        following: [],
        followers: [],
      };

      currentUserData.following = currentUserData.following || [];
      currentUserData.followers = currentUserData.followers || [];
      otherUserData.following = otherUserData.following || [];
      otherUserData.followers = otherUserData.followers || [];

      if (isFollowing) {
        currentUserData.following = currentUserData.following.filter(
          (id) => id !== userId
        );
        otherUserData.followers = otherUserData.followers.filter(
          (id) => id !== uid
        );
      } else {
        currentUserData.following.push(userId);
        otherUserData.followers.push(uid);
      }

      await Promise.all([
        set(currentUserRef, currentUserData),
        set(otherUserRef, otherUserData),
      ]);

      const [updatedCurrentUserData, updatedOtherUserData] = await Promise.all([
        get(currentUserRef),
        get(otherUserRef),
      ]);

      console.log("Updated Current User Data:", updatedCurrentUserData.val());
      console.log("Updated Other User Data:", updatedOtherUserData.val());
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };



  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="w-50 h-100 m-auto">
        <div className="container" >
          <div className="row">
          {otherUsersData.length == 0 && <h3>No user found</h3>}
            {otherUsersData?.length > 0 &&
              otherUsersData.map((item, index) => {
                const { name, userId } = { ...item.userInfo };
                return (
                  <div key={userId}>
                    <div
                      className={`container d-flex ${
                        index === 0
                          ? "first-childred-user"
                          : "other-children-user"
                      }`}
                    >
                      <div className="col">
                        <img src={imgURL} height="70rem" width="50" />
                      </div>
                      <div className="col">
                        <h4>{name}</h4>
                        {/* <p>{item.following}</p> */}
                      </div>
                      <div className="col">
                        <button 
                        style={{width:"8rem", height:"2.5rem", borderRadius:"5px", border:"none", background:"#D63484", color:"white",fontWeight:"600"}}
                        onClick={() => handleFollow(userId)}>
                          {followingUsers?.includes(userId)
                            ? "Following"
                            : "Follow"}
                        </button>
                      </div>
                      <hr
                        style={{
                          color: "#000000",
                          backgroundColor: "black",
                          height: 3,
                          borderColor: "#000000",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
