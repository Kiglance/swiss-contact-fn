import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSchool,
  changeSchoolStatus,
  deleteSChool,
  fetchSchools,
} from "../redux/actions/schools.actions";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
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
  Drawer,
} from "antd";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";

const items = (deleteSchool, showUpdateModal, navigateToSchool) => [
  {
    label: (
      <Popconfirm
        title="Delete school"
        description="Are you sure you want to delete this school?"
        onConfirm={deleteSchool}
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: {
            background: "#ff4040",
          },
        }}
        cancelButtonProps={{
          style: {
            background: "#ccc",
          },
        }}
      >
        {" "}
        Delete school
      </Popconfirm>
    ),
    key: "0",
  },
  {
    label: <a onClick={showUpdateModal}>Update school</a>,
    key: "1",
  },
  {
    label: <a onClick={navigateToSchool}>View school</a>,
    key: "2",
  },
];
const statusItems = (changeStatus) => [
  {
    label: <a onClick={changeStatus}>pending</a>,
    key: "0",
  },
  {
    label: <a onClick={changeStatus}>revoked</a>,
    key: "1",
  },
  {
    label: <a onClick={changeStatus}>granted</a>,
    key: "2",
  },
];

const Schools = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const schools = useSelector((state) => state.schoolReducer);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [school, setSchool] = useState({});
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const initialValues = {
    schoolName: school?.name,
    district: school?.district,
    sector: school?.sector,
    phone: school?.phone,
    email: school?.email,
    userName: school?.userName,
  };

  updateForm.setFieldsValue(initialValues);

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSchools()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const deleteSchool = () => {
    dispatch(deleteSChool(school?.key)).then(() => {
      dispatch(fetchSchools());
    });
  };

  const navigateToSchool = () => {
    nav(`/dashboard/school/${school?.key}`);
  };

  const changeStatus = (e) => {
    setLoading(true);
    dispatch(
      changeSchoolStatus(school?.key, { status: e.target.innerText })
    ).then(() => {
      dispatch(fetchSchools()).then(() => {
        setLoading(false);
      });
    });
  };

  const data = schools?.data?.data?.map((school, idx) => {
    return {
      key: school.schoolId,
      name: school.schoolName,
      district: school.district,
      sector: school.sector,
      phone: school.phone,
      status: [`${school.status}`],
      email: school.email,
      userName: school.userName,
    };
  });

  const filteredData = data?.filter((value) => {
    return (
      value.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.district.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.sector.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.userName.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.phone.toString().includes(searchInput)
    );
  });

  const handleSearch = (input) => {
    setSearchInput(input.target.value);
  };

  const columns = [
    {
      title: "School name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      ellipsis: true,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (_, record) => (
        <>
          {record?.status?.map((tag, idx) => {
            let color =
              tag === "pending"
                ? "yellow"
                : tag === "revoked"
                ? "volcano"
                : "green";
            return (
              <Dropdown
                key={idx + 1}
                menu={{
                  items: statusItems(changeStatus),
                }}
                trigger={["click"]}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSchool(record);
                  }}
                >
                  <Tag color={color} key={tag} className="cursor-pointer">
                    {tag}
                  </Tag>
                </a>
              </Dropdown>
            );
          })}
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 60,
      ellipsis: true,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: items(deleteSchool, showUpdateModal, navigateToSchool),
          }}
          trigger={["click"]}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              setSchool(record);
            }}
          >
            <Space
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <HiDotsVertical className="cursor-pointer" />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const getRowClassName = (record, index) => {
    return index % 2 === 0
      ? "bg-white bg-opacity-50"
      : "bg-gray-100 bg-opacity-50";
  };

  const handleSubmit = async (values) => {
    setCreateLoading(true);
    setLoading(true);
    await dispatch(addSchool(values))
      .then(() => {
        dispatch(fetchSchools());
        setOpen(false);
        setCreateLoading(false);
        setLoading(false);
      })
      .then(() => {
        form.resetFields();
      });
  };

  const handleSubmitUpdate = async (values) => {
    setCreateLoading(true);
    setLoading(true);
    await dispatch(changeSchoolStatus(school?.key, values))
      .then(() => {
        dispatch(fetchSchools());
        setOpenUpdateModal(false);
        setCreateLoading(false);
        setLoading(false);
      })
      .then(() => {
        updateForm.resetFields();
      });
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between relative py-2">
        <Button className="flex items-center gap-2" onClick={showModal}>
          <AiOutlinePlus /> Add School
        </Button>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl hidden sm:inline-block">
          Schools
        </h1>
        <Button
          className="flex items-center gap-2 bg-[#57cf9d] text-white"
          onClick={showDrawer}
        >
          Print Schools
        </Button>
      </div>
      <Drawer
        title="Print school list"
        placement="right"
        onClose={onClose}
        open={openDrawer}
        width={550}
      >
        <Space direction="vertical">
          {" "}
          <PDFViewer width="500" height="600">
            <Document>
              <Page size="A4">
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: "25px",
                      marginBottom: 10,
                      textDecoration: "underline",
                    }}
                  >
                    List of schools
                  </Text>
                  {data?.map((school, idx) => {
                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                        key={idx}
                      >
                        <Text
                          style={{
                            width: "25px",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {idx + 1}{" "}
                        </Text>
                        <Text>
                          {school?.name}({school?.email})
                        </Text>
                        <Text>/ {school?.district}</Text>
                      </View>
                    );
                  })}
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Space>
      </Drawer>
      <Input.Search
        placeholder="Search schools"
        allowClear
        onInput={handleSearch}
        style={{ marginBottom: 16 }}
        className="w-60 md:w-80"
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowClassName={getRowClassName}
        scroll={{
          y: 380,
          x: 640,
        }}
        pagination={{
          position: ["bottomCenter"],
        }}
        size="middle"
        loading={loading}
      />
      <Modal open={open} footer={[]} onCancel={closeModal} style={{}}>
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
            maxWidth: 600,
          }}
          onFinish={handleSubmit}
        >
          <h1 className="text-xl mb-2 text-center font-bold">Add school</h1>

          <Form.Item
            label="School name"
            name="schoolName"
            rules={[
              {
                required: true,
                message: "Please input your schoolname!",
              },
            ]}
          >
            <Input placeholder="Enter your schoolname" />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[
              {
                required: true,
                message: "Please input your district!",
              },
            ]}
          >
            <Input placeholder="Enter your district" />
          </Form.Item>

          <Form.Item
            label="Sector"
            name="sector"
            rules={[
              {
                required: true,
                message: "Please input your sector!",
              },
            ]}
          >
            <Input placeholder="Enter your sector" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
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
              loading={createLoading}
              type="primary"
              htmlType="submit"
              className="bg-[#57cf9d] border-none px-8 text-white"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={openUpdateModal}
        footer={[]}
        onCancel={closeUpdateModal}
        style={{}}
      >
        <Form
          form={updateForm}
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
          onFinish={handleSubmitUpdate}
        >
          <h1 className="text-xl mb-4 text-center font-bold">Update school</h1>

          <Form.Item
            label="School name"
            name="schoolName"
            rules={[
              {
                required: true,
                message: "Please input your schoolname!",
              },
            ]}
          >
            <Input placeholder="Enter your schoolname" />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[
              {
                required: true,
                message: "Please input your district!",
              },
            ]}
          >
            <Input placeholder="Enter your district" />
          </Form.Item>

          <Form.Item
            label="Sector"
            name="sector"
            rules={[
              {
                required: true,
                message: "Please input your sector!",
              },
            ]}
          >
            <Input placeholder="Enter your sector" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

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
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              loading={createLoading}
              type="primary"
              htmlType="submit"
              className="bg-[#57cf9d] border-none px-8 text-white"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Schools;
