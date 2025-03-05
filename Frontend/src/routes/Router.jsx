import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "../components/login";
import Register from "../components/Register";
import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
