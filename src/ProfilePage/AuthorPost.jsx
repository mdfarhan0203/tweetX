import React, { useEffect, useState } from "react";
import Profile from "../component/Profile";
import { fetchCurrentUserData } from "../firebase/commanFun";

const AuthorPost = () => {
  // get all auther post and  list out
  const [currentUser, setCurrentuser] = useState([]);
  

  async function getCurrentUser() {
    try {
      let userData = await fetchCurrentUserData();
      if (userData) {
        setCurrentuser(userData.tweets);
      }
    } catch (error) {
      console.log("error while fetching current user data",error)
    }
  }
  
  useEffect(() => {
    getCurrentUser();
  }, []);



  return (
    <div>
      <Profile />
      <div className="h-100 m-auto" style={{width:"52%"}}>
        {currentUser.map((item,index) => {
          return (
            <div className="row w-100 mt-3" key={index}>
              <div className="col-md-6 col-lg">
                <div className="card custom-card"  style={{marginLeft:"1rem"}}>
                  <div className="row" style={{background:"#FFF7F1" ,borderRadius:"10px"}}>
                    <div className="col-md-4">
                      <img
                        src={item.imgURL}
                        className="img-fluid rounded-start"
                        alt="User Image"
                        style={{height:"7rem"}}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="card-title d-flex  justify-content-around">
                          <h5>{item.author}</h5>
                          <h5>{item.timeStamp}</h5>
                        </div>
                        <div>
                          <p className="card-text">
                          {item.message}
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
export default AuthorPost;
