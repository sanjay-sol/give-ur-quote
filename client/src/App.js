// import './App.css';
import { Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
// import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/post" element={<Post />} />

      </Routes>
    </>
  );
}

export default App;
