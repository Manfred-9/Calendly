import React from "react";
import { Routes, Route } from "react-router-dom";
import Calendar01 from "../components/Calendar/Calendar01";
import { Home } from "./Home";
import { Home as UserHome } from "../components/User Dashboard/UserHome";
import EventTypes from "../components/User Dashboard/EventTypes";
import EventForm from "../components/User Dashboard/EventForm";
import Profile from "../components/Profile";
export const MainRoutes = ({ user }) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userevent/userhome" element={<UserHome />} />
        <Route path="/userevent/userhome/yourevent" element={<EventTypes />} />
        <Route path="/userevent/userhome/eventforms" element={<EventForm />} />
        <Route path="/userevent/userhome/calendar" element={<Calendar01 />} />
        {user && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </div>
  );
};
