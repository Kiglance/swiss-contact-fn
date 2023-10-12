import React, { useState } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  Form,
  Input,
  Modal,
  Dropdown,
  message,
  Spin,
  Popconfirm,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../redux/actions/user.actions";
import { useLoginData } from "../context/LoginContext";
import { updateSchoolPassword } from "../redux/actions/schools.actions";

const Password = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userUpdateReducer);
  const [form] = Form.useForm();
  const [id] = useState(JSON.parse(localStorage.getItem("loginData"))?.id);
  const { loginData, setLoginData } = useLoginData();

  const updatePasswword = async (values) => {
    if (loginData?.type === "user") {
      await dispatch(updateUserPassword(values, id)).then(() => {
        if (!data?.error) {
          form.resetFields();
        }
      });
    } else {
      await dispatch(updateSchoolPassword(values, id)).then(() => {
        if (!data?.error) {
          form.resetFields();
        }
      });
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full max-w-[440px] bg-slate-100 rounded-lg p-3">
        <h1 className="text-center text-xl mb-4">Change password</h1>
        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          scrollToFirstError
          style={{
            width: "100%",
            maxWidth: 400,
          }}
          layout="vertical"
          onFinish={updatePasswword}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#57cf9d] border-none px-8 text-white"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Password;
