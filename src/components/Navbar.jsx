import Link from "antd/es/typography/Link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { HiMenuAlt1 } from "react-icons/hi";
import { CgSwiss } from "react-icons/cg";
import { useLoginData } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/user.actions";

const loggedInItems = (logout) => [
  {
    key: "1",
    label: (
      <a className="flex items-center gap-2" onClick={logout}>
        <IoMdLogOut />
        Sign Out
      </a>
    ),
    danger: true,
  },
];

const Navbar = ({ toggleSideBar }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loginData, setLoginData } = useLoginData();

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      setLoginData(null);
      nav("/");
    });
  };
  return (
    <div className="flex justify-between sm:px-8 px-2 py-3 shadow-md fixed top-0 left-0 right-0 z-[1000] bg-white">
      <span className="cursor-pointer md:hidden" onClick={toggleSideBar}>
        <HiMenuAlt1 />
      </span>
      <Link
        className="cursor-pointer md:inline-block hidden mt-1"
        href="/"
        style={{
          color: "#000",
        }}
      >
        <CgSwiss className="text-2xl text-[#57cf9d]" />
      </Link>
      <span>
        <div className="flex items-center gap-8 px-4">
          {" "}
          <Link
            className="cursor-pointer text-base"
            href="/"
            style={{
              color: "#000",
            }}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer text-base"
            href="/dashboard"
            style={{
              color: "#000",
            }}
          >
            Dashboard
          </Link>
        </div>
      </span>
      <span className="cursor-pointer">
        {loginData ? (
          <Dropdown menu={{ items: loggedInItems(logout) }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <FaUserCircle />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Space>
            <FaUserCircle />
          </Space>
        )}
      </span>
    </div>
  );
};

export default Navbar;
