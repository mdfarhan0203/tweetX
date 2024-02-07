import React, { useEffect, useState } from "react";
import Profile from "../component/Profile";
import { fetchCurrentUserData, fetchUserDataById ,imgURL} from "../firebase/commanFun";

const followers = () => {

  const [noFollowers, setNoFollowers] = useState(false);
  const [followersData,setFollowersData] = useState([])

  const fetchCurrentUser = async () => {
    try {
      let userData = await fetchCurrentUserData();
      if (userData) {
        let follwers = userData.followers;
        ///filter before fetching Data
        const uid = localStorage.getItem("auth-key");
        let uniFollower = follwers?.filter((item) => item !== uid);
        console.log("ll", uniFollower);

        if (uniFollower.length > 0) {
          const followersData = await Promise.all(
            uniFollower.map((item) => fetchUserDataById(item))
          );
          setFollowersData(followersData)
          setNoFollowers(false);
        } else {
          setNoFollowers(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  console.log("followersData", followersData);

  return (
    <div>
      <Profile />
      <div className="h-100 m-auto" style={{width:"53%"}}>
        {noFollowers.length == 0  || followersData.length == 0? <h2 style={{marginLeft:"1rem"}}>No Folowes</h2> :
        followersData?.map((item) => {
          console.log("item",item.userInfo)
          const  {name ,userId}  = {...item.userInfo} 
          return (
            <div className="row w-100" key={userId}>
              <div className="col-md-6 col-lg mt-3">
                <div className="card custom-card" style={{marginLeft:"1rem"}}>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={imgURL}
                        className="img-fluid rounded-start"
                        alt="User Image"
                        style={{height:"6rem"}}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body d-flex justify-content-between">
                        <div className="card-title">
                          <h5>{name}</h5>
                         
                        </div>
                        <div>
                          <p className="card-text">
                            <button style={{width:"8rem", height:"2.1rem",border:"none",borderRadius:"10px",background:"#D63484",color:"white",fontWeight:"600"}}>Followers</button>
                          </p>
                      </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
                










        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        }
      </div>
    </div>
  );
};
export default followers;
