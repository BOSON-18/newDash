import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <SideBar/>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
