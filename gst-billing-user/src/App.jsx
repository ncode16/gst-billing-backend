import React from "react";
import { About } from "./components/about";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import Home from "./components/Home/Home";

import {
  Routes,
  Route
} from 'react-router-dom'

import LoginPage from './components/Login/LoginPage'
import SignUp from "./components/Login/LoginPage";
import Otp from "./components/Login/otpMessage";
import WelcomePage from "./components/Login/welcome";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="/otp" element={<Otp />} exact />
        <Route path="/welcome" element={<WelcomePage/>}/>

      </Routes>
    </div>
  );
};

export default App;
