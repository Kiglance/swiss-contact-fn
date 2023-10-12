import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { LuSchool2 } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiNotepad } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";
import { useContent } from "../context/ContentContext";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { logoutUser } from "../redux/actions/user.actions";
import { useLoginData } from "../context/LoginContext";
import { PiPassword } from "react-icons/pi";

const loggedInItems = (logout, handleSettingsClick, changePassword) => [
  {
    key: "0",
    label: (
      <a className="flex items-center gap-2" onClick={handleSettingsClick}>
        <FaUser />
        Profile
      </a>
    ),
  },
  {
    key: "1",
    label: (
      <a className="flex items-center gap-2" onClick={changePassword}>
        <PiPassword />
        Change password
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a className="flex items-center gap-2" onClick={logout}>
        <IoMdLogOut />
        Sign Out
      </a>
    ),
    danger: true,
  },
];

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { contentData, setContentData } = useContent();
  const { loginData, setLoginData } = useLoginData();

  const handleDashboardClick = () => {
    setContentData(0);
    setShowSideBar(false);
  };

  const handleSchoolsClick = () => {
    setContentData(1);
    setShowSideBar(false);
  };

  const handleProjectsClick = () => {
    setContentData(2);
    setShowSideBar(false);
  };

  const handleSettingsClick = () => {
    setContentData(3);
    setShowSideBar(false);
  };

  const handlePasswordClick = () => {
    setContentData(4);
    setShowSideBar(false);
  };

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      setLoginData(null);
      nav("/");
    });
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`w-44 min-w-44 fixed top-[46px] z-50 shadow-[#00000059 0px 5px 15px] bg-[#edf7ff] shadow-md h-[100vh] overflow-hidden box-border md:left-0  ${
        windowWidth < 768 && (showSideBar ? "new_scroll" : "new_element")
      }`}
    >
      <div className="flex flex-col gap-6 p-6">
        <span
          className={`flex items-center gap-4 cursor-pointer text-base ${
            contentData === 0 && "text-[#31b493] font-semibold"
          }`}
          onClick={handleDashboardClick}
        >
          <AiOutlineDashboard /> Dashboard
        </span>
        {loginData?.type === "user" && (
          <span
            className={`flex items-center gap-4 cursor-pointer text-base ${
              contentData === 1 && "text-[#31b493] font-semibold"
            }`}
            onClick={handleSchoolsClick}
          >
            <LuSchool2 /> Schools
          </span>
        )}

        <span
          className={`flex items-center gap-4 cursor-pointer text-base ${
            contentData === 2 && "text-[#31b493] font-semibold"
          }`}
          onClick={handleProjectsClick}
        >
          <PiNotepad /> Projects
        </span>
        <span
          className={`flex items-center gap-4 cursor-pointer text-base ${
            contentData === 3 && "text-[#31b493] font-semibold"
          }`}
          // onClick={handleSettingsClick}
        >
          <Dropdown
            menu={{
              items: loggedInItems(
                logout,
                handleSettingsClick,
                handlePasswordClick
              ),
            }}
            trigger={["click"]}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                <FiSettings /> Settings
              </Space>
            </a>
          </Dropdown>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
