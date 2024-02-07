import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Feeds from "./component/Feed.jsx";
import Users from "./component/Users.jsx";
import Profile from "./component/Profile.jsx";
import PageNotFound from "./component/PageNotFound.jsx";
import  Post from "./ProfilePage/Post.jsx"
import Following from "./ProfilePage/Following.jsx"
import Followers from "./ProfilePage/Followers.jsx"
import AuthorPost from "./ProfilePage/AuthorPost.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feeds />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/following" element={<Following />} />
          <Route path="/follower" element={<Followers />} />
          <Route path="/author-post" element={<AuthorPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
