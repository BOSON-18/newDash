import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import Results from "../Results/Results";

const Dashboard = () => {
  return (
    <div className="realtive flex min-h-[[calc(100ch-3.5rem)] w-full">
    <SideBar />
    <div className="h-[calc(100vh-3.5rem)] w-11/12 overflow-auto overflow-x-hidden">
      <div className="mx-auto w-11/12  py-10 ">
        <Results />
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
