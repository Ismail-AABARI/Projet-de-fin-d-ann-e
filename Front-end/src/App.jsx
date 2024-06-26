import React from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate  } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Reset from "./components/Reset";
import Text from "./components/text";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Home1 from "./components/Home1";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/register"element={<Signup/>} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/text" element={<Text/>}></Route>
      <Route path="/resetPassword/:userId/:resetString" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/home" element={<Home1 />} />
      {/* Ajoutez d'autres routes ici si nécessaire */}
    </Routes>
  </Router>
);

export default App;
