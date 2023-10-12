import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { HiDotsVertical } from "react-icons/hi";
import { Space, Table, Tag } from "antd";
import DashboardMain from "../components/DashboardMain";
import { useContent } from "../context/ContentContext";
import Schools from "../components/Schools";
import Projects from "../components/Projects";
import Settings from "../components/Settings";
import { useLoginData } from "../context/LoginContext";
import { Navigate, useNavigate } from "react-router-dom";
import Password from "../components/Password";

const Dashboard = () => {
  const nav = useNavigate();
  const { contentData, setContentData } = useContent();
  const { loginData, setLoginData } = useLoginData();
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((value) => !value);
  };

  useEffect(() => {
    if (!loginData) {
      return nav("/");
    }
    // if (loginData && loginData?.type !== "user") {
    //   return nav("/school/dashboard");
    // }
  }, []);

  return (
    <div>
      <Navbar toggleSideBar={toggleSideBar} />
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="md:pl-44">
        <div className="md:px-10 sm:px-4 px-2 pt-16">
          {contentData === 0 && <DashboardMain />}
          {contentData === 1 && <Schools />}
          {contentData === 2 && <Projects />}
          {contentData === 3 && <Settings />}
          {contentData === 4 && <Password />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
