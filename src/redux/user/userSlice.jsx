import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    currentUserInfo :{},
    otherUser:[],
    followingUsersData:[]
};


export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addCurrentUser: (state, { payload }) => {
      state.currentUserInfo = payload;
    },
    addOtherUser:(state,{payload})=>{
      state.otherUser = payload
    },
    addFollowingUsers:(state,{payload})=>{
      state.followingUsersData = payload
    }
    
  },
});

export const {addCurrentUser,addOtherUser, addFollowingUsers} = userSlice.actions
export const getCurrentUserInfo = (state) =>state.userData.currentUserInfo;
export const getOtherUser = (state)=>state.userData.otherUser;
export const getFollowingUsersData = (state)=>state.userData.followingUsersData;

export default userSlice.reducer;
