import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/actions/user.actions";
import { useLoginData } from "../context/LoginContext";
import { fetchOneSchool, updateSchool } from "../redux/actions/schools.actions";

const Settings = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.fetchUserReducer);
  const schoolData = useSelector((state) => state.fetchSchoolReducer);
  const { loginData, setLoginData } = useLoginData();
  const [id] = useState(JSON.parse(localStorage.getItem("loginData"))?.id);
  const [picture, setPicture] = useState(null);
  const [picUrl, setPicUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const user = admin?.data?.data?.data;
  const school = schoolData?.data?.data;

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPicUrl(e.target.result);
      };
      reader.readAsDataURL(picture);
    } else {
      setPicUrl(null);
    }
  }, [picture]);

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchOneSchool(id));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    loginData?.type === "user"
      ? form.setFieldsValue(user)
      : form.setFieldsValue(school);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSubmitUpdateUser = async (values) => {
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("userName", values.userName);
    formData.append("picture", picture);

    await dispatch(updateUser(formData, id)).then(() => {
      dispatch(fetchUser(id));
      setIsEditing(false);
      form.resetFields();
    });
  };

  const handleSubmitUpdateSchool = async (values) => {
    const formData = new FormData();

    formData.append("schoolName", values.schoolName);
    formData.append("district", values.district);
    formData.append("sector", values.sector);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("userName", values.userName);
    formData.append("picture", picture);

    await dispatch(updateSchool(id, formData)).then(() => {
      dispatch(fetchOneSchool(id));
      setIsEditing(false);
      form.resetFields();
    });
  };

  return (
    <div className="md:pl-[15%] mx-auto flex flex-col items-center">
      <div className="p-2 md:p-8 rounded-md bg-slate-100 w-fit sm:w-[440px] max-w-[450px] min-h-[528px] max-h-[528px] overflow-auto border-[2px] md:border-[12px] border-slate-100">
        <input
          value=""
          onChange={(e) => {
            setPicture(e.target?.files && e.target?.files[0]);
          }}
          name="picture"
          id="picture"
          type="file"
          className="hidden"
        />
        <div className="w-fit">
          {isEditing ? (
            <label role="button" htmlFor="picture">
              {picUrl ? (
                <img
                  src={picUrl}
                  className="w-36 aspect-square rounded-md object-cover shadow-md cursor-pointer"
                />
              ) : (
                <img
                  src={
                    loginData?.type === "user" ? user?.picture : school?.picture
                  }
                  className="w-36 aspect-square rounded-md object-cover shadow-md cursor-pointer"
                />
              )}
            </label>
          ) : (
            <>
              {" "}
              <img
                src={
                  loginData?.type === "user" ? user?.picture : school?.picture
                }
                className="w-36 aspect-square rounded-md object-cover shadow-md"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-3 py-8">
          {isEditing ? (
            <>
              {" "}
              {loginData?.type === "user" ? (
                <Form
                  form={form}
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
                    maxWidth: 440,
                  }}
                  onFinish={handleSubmitUpdateUser}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            First Name:
                          </span>
                        }
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your firstName!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Last Name:
                          </span>
                        }
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your lastName!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Email:
                          </span>
                        }
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Username:
                          </span>
                        }
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="flex items-center gap-3">
                    <Button
                      className="bg-[#57cf9d] border-none px-8 text-white"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                    <Button type="default" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form
                  form={form}
                  name="wrap"
                  labelCol={{
                    flex: "140px",
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 440,
                  }}
                  onFinish={handleSubmitUpdateSchool}
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            School Name:
                          </span>
                        }
                        name="schoolName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your schoolName!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            District:
                          </span>
                        }
                        name="district"
                        rules={[
                          {
                            required: true,
                            message: "Please input your district!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Sector:
                          </span>
                        }
                        name="sector"
                        rules={[
                          {
                            required: true,
                            message: "Please input your sector!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Phone:
                          </span>
                        }
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Email:
                          </span>
                        }
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <span className="font-semibold text-[16px]">
                            Username:
                          </span>
                        }
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="flex items-center gap-3">
                    <Button
                      className="bg-[#57cf9d] border-none px-8 text-white"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                    <Button type="default" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </>
          ) : (
            <>
              {loginData?.type === "user" ? (
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 pl-2">
                    <div className="flex flex-col items-start gap-8">
                      <span className="font-semibold text-[#000000E0]">
                        First Name:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Last Name:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Email:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Username:
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-8">
                      <span className="">{user?.firstName}</span>
                      <span className="">{user?.lastName}</span>
                      <span className="">{user?.email}</span>
                      <span className="">{user?.userName}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleEditClick}
                    className="bg-[#57cf9d] border-none px-8 text-white"
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3 pl-2">
                    <div className="flex flex-col items-start gap-3">
                      <span className="font-semibold text-[#000000E0]">
                        School Name:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        District:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Sector:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Phone:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Email:
                      </span>
                      <span className="font-semibold text-[#000000E0]">
                        Username:
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <span className="">{school?.schoolName}</span>
                      <span className="">{school?.district}</span>
                      <span className="">{school?.sector}</span>
                      <span className="">{school?.phone}</span>
                      <span className="">{school?.email}</span>
                      <span className="">{school?.userName}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleEditClick}
                    className="bg-[#57cf9d] border-none px-8 text-white"
                  >
                    Update
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
