import { ref, get, set, onValue,  } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./fire";

const imgURL =
  "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=1024x1024&w=is&k=20&c=ZVVVbYUtoZgPqbVSDxoltjnrW3G_4DLKYk6QZ0uu5_w=";

// SIGN UP
async function signupUsingEmailAndPassword(formData) {
  const { email, password, post, followers, following } = { ...formData };
  console.log("signup-------", email, password, post, followers, following);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

function writeUserData(userId, data) {
  const { name, email, password, post, followers, following } = { ...data };

  // time
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const newStructure = {
    userInfo: {
      userId: userId,
      email,
      password,
      name,
      imgURL: imgURL,
    },
    tweets: [
      {
        id: userId,
        author: name,
        message: "default message auto sent",
        timeStamp: time,
        imgURL: imgURL,
      },
    ],
    followers: [userId],
    following: [userId],
  };
  set(ref(db, "usersInfo/" + userId), {
    user: newStructure,
  });
}

// LOGIN
async function signInUsingEmailAndPassword(data) {
  const { email, password } = { ...data };
  let response = await signInWithEmailAndPassword(auth, email, password);
  console.log(response);

  return response;
}

//FORGET PASSWORD
async function forgetPassword() {
  // const user = auth.currentUser;
  // const newPassword = getASecureRandomPassword();
  // let response = await updatePassword(user, newPassword).then(() => {
  //   // Update successful.
  // }).catch((error) => {
  //   // An error ocurred
  //   // ...
  // });
  // const user = auth.currentUser;
  // const newPassword = 22222222;
  // updatePassword(user, newPassword).then(() => {
  //  console.log("updated successfully",)
  // }).catch((error) => {
  //   // An error ocurred
  //   // ...
  // });
}

// Feed
async function fetchCurrentUserData() {
  try {
    const uid = localStorage.getItem("auth-key");
    const userRef = ref(db, "usersInfo/" + uid);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    console.log(userData);
    return userData?.user || null;
  } catch (error) {
    console.error("Error fetching current user data:", error);
    return null;
  }
}

const fetchUserDataById = async (userId) => {
  try {
    const snapshot = await get(ref(db, `usersInfo/${userId}`));
    const data = snapshot.val();
    if (data && data.user) {
      return data.user;
    } else {
      console.warn(`No valid data found for user with ID: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

function fetchAllUserDataDB() {
  let allUsers;
  try {
    const starCountRef = ref(db, "usersInfo/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        allUsers = Object.values(data).map((item) => item.user);
      }
    });
  } catch (error) {
    console.log("get Error while fetching all user data from DB", error);
    return [];
  }
  console.log(allUsers);
  return allUsers;
}

export {
  signupUsingEmailAndPassword,
  writeUserData,
  signInUsingEmailAndPassword,
  forgetPassword,
  fetchCurrentUserData,
  fetchUserDataById,
  fetchAllUserDataDB,
  imgURL,
};
