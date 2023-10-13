import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/user.actions";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../context/LoginContext";
import { loginSchool } from "../redux/actions/schools.actions";
import { useContent } from "../context/ContentContext";

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const { loginData, setLoginData } = useLoginData();
  const { contentData, setContentData } = useContent();
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    if (isAdmin) {
      dispatch(loginUser(values))
        .then((res) => {
          setLoginData(JSON.parse(localStorage.getItem("loginData")));
          setLoading(false);
        })
        .then(() => {
          setContentData(0);
          nav("/dashboard");
          setOpen(false);
        });
    } else {
      dispatch(loginSchool(values))
        .then((res) => {
          setLoginData(JSON.parse(localStorage.getItem("loginData")));
          setLoading(false);
        })
        .then(() => {
          setContentData(0);
          nav("/dashboard");
          setOpen(false);
        });
    }
  };
  return (
    <>
      <Navbar />

      <div className="w-full h-full min-h-[640px] p-2 sm:p-8 md:p-24 md:pl-32 flex flex-col justify-center">
        <div className="w-full max-w-[580px] flex flex-col gap-8">
          <span className="flex flex-col gap-3">
            <h1 className="sm:text-7xl text-4xl text-[#57cf9d]">
              <span className="bg-[#57cf9d] text-white">SWISS</span>CONTACT
            </h1>
            <h2 className="sm:text-4xl text-xl">
              Platform to submit your project
            </h2>
          </span>
          <span className="text-sm sm:text-base">
            Welcome to our platform! If you're a TVET school from Western
            Province, our web application makes it easy for you to submit your
            projects for review and selection. Showcase your innovations here.
          </span>
          <span className="flex items-center gap-3 sm:gap-8">
            <Button
              className="bg-[#57cf9d] border-none text-white"
              onClick={() => {
                setIsAdmin(true);
                showModal();
              }}
            >
              Admin Login
            </Button>
            <Button
              className="border-[1.5px] border-[#57cf9d] text-[#57cf9d]"
              onClick={() => {
                setIsAdmin(false);
                showModal();
              }}
            >
              School Login
            </Button>
          </span>
        </div>
        <Modal open={open} onCancel={handleCancel} footer={[]}>
          <Form
            name="wrap"
            labelCol={{
              flex: "110px",
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}
            onFinish={handleSubmit}
          >
            <h1 className="text-xl mb-4 text-center font-bold">
              {isAdmin ? "Admin" : "School"} Login
            </h1>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-[#57cf9d] border-none px-8 text-white"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Home;
