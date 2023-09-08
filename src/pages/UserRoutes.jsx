import React from "react";
import { Route, Routes } from "react-router-dom";
import EventTypes from "../components/User Dashboard/EventTypes";
const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventTypes />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
