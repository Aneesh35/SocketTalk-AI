import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/Register";
import Project from "../components/Project";
import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
import UserAuth from "../auth/userAuth";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<UserAuth><Home/></UserAuth>}></Route>
          <Route path="/project" element={<UserAuth><Project/></UserAuth>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
