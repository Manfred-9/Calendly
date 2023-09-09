import React from "react";
import { Navbar } from "../components/User Dashboard/UserNavbar";
import UserNavRoutes from "./UserNavRoutes";
const UserDashboard = () => {
  return (
    <div>
      <Navbar />
      <UserNavRoutes />
    </div>
  );
};

export default UserDashboard;
