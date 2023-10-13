import React, { useEffect, useState } from "react";
import { useLoginData } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProjectAction,
  fetchAdminProjects,
  fetchProjects,
  updateProject,
  updateProjectStatus,
} from "../redux/actions/project.actions";
import { HiDotsVertical } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
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
  Upload,
  Drawer,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const items = (deleteProject, showUpdateModal, loginData, projectUrl) => [
  {
    label: (
      <Popconfirm
        title="Delete project"
        description="Are you sure you want to delete this project?"
        onConfirm={deleteProject}
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
        Delete project
      </Popconfirm>
    ),
    key: "0",
  },
  ...(loginData?.type === "user"
    ? []
    : [
        {
          label: <a onClick={showUpdateModal}>Update project</a>,
          key: "1",
        },
      ]),

  {
    label: <a href={`${projectUrl}`}>Download project</a>,
    key: "2",
  },
];

const statusItems = (changeStatus) => [
  {
    label: <a onClick={changeStatus}>pending</a>,
    key: "0",
  },
  {
    label: <a onClick={changeStatus}>rejected</a>,
    key: "1",
  },
  {
    label: <a onClick={changeStatus}>selected</a>,
    key: "2",
  },
];

const Projects = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loginData, setLoginData } = useLoginData();
  const [project, setProject] = useState();
  const projects = useSelector((state) => state.projectReducer);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPdfDrawer, setOpenPdfDrawer] = useState(false);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [filePdf, setFilePdf] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const beforeUpload = (file) => {
    if (file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPdfUrl(e.target.result);
      };

      reader.readAsDataURL(file);
      setFilePdf(file);
    } else {
      message.error("You can only upload PDF files!");
    }

    return false;
  };

  const initialValues = {
    projectName: project?.projectName,
    projectOwner: project?.projectOwner,
  };

  const deleteProject = () => {
    dispatch(deleteProjectAction(project?.key)).then(() => {
      if (loginData?.type === "user") {
        dispatch(fetchAdminProjects());
      } else {
        dispatch(fetchProjects());
      }
    });
  };

  const changeStatus = (e) => {
    dispatch(
      updateProjectStatus(project?.key, { status: e.target.innerText })
    ).then(() => {
      dispatch(fetchAdminProjects());
    });
  };

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const showUpdateModal = () => {
    updateForm.setFieldsValue(initialValues);
    setOpenUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const getRowClassName = (record, index) => {
    return index % 2 === 0
      ? "bg-white bg-opacity-50"
      : "bg-gray-100 bg-opacity-50";
  };

  const data = projects?.data?.data?.map((project, idx) => {
    return {
      key: project.projectId,
      projectName: project.projectName,
      projectOwner: project.projectOwner,
      projectFile: project?.projectFile,
      school: project?.School?.schoolName,
      status: [`${project.status}`],
      updatedAt: `${new Date(project.updatedAt).toLocaleDateString()}`,
    };
  });

  const columns = [
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      ellipsis: true,
    },
    {
      title: "Project owner",
      dataIndex: "projectOwner",
      key: "projectOwner",
      ellipsis: true,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
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
                : tag === "rejected"
                ? "volcano"
                : "green";
            return (
              <div key={idx + 1}>
                {loginData?.type === "user" ? (
                  <Dropdown
                    menu={{
                      items: statusItems(changeStatus),
                    }}
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setProject(record);
                      }}
                    >
                      <Tag color={color} key={tag} className="cursor-pointer">
                        {tag}
                      </Tag>
                    </a>
                  </Dropdown>
                ) : (
                  <>
                    <Tag color={color} key={tag} className="cursor-default">
                      {tag}
                    </Tag>
                  </>
                )}
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Added on",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
            items: items(
              deleteProject,
              showUpdateModal,
              loginData,
              record?.projectFile
            ),
          }}
          trigger={["click"]}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
              setProject(record);
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

  useEffect(() => {
    setTableLoading(true);

    if (loginData?.type === "user") {
      dispatch(fetchAdminProjects()).then(() => {
        setTableLoading(false);
      });
    } else {
      dispatch(fetchProjects()).then(() => {
        setTableLoading(false);
      });
    }
  }, []);
  const filteredData = data?.filter((value) => {
    return (
      value.projectName.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.projectOwner.toLowerCase().includes(searchInput.toLowerCase()) ||
      value.school.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const handleSearch = (input) => {
    setSearchInput(input.target.value);
  };

  useEffect(() => {
    if (!loginData) {
      return nav("/");
    }
  }, []);

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("projectName", values?.projectName);
    formData.append("projectOwner", values?.projectOwner);
    formData.append("projectFile", filePdf);

    setLoading(true);

    await dispatch(addProject(formData))
      .then(() => {
        dispatch(fetchProjects());
        setOpen(false);
        setLoading(false);
      })
      .then(() => {
        form.resetFields();
        setPdfUrl(null);
        setFilePdf(null);
      });
  };

  const handleSubmitUpdate = async (values) => {
    const formData = new FormData();

    setLoading(true);
    formData.append("projectName", values?.projectName);
    formData.append("projectOwner", values?.projectOwner);
    formData.append("projectFile", filePdf);

    await dispatch(updateProject(project?.key, formData))
      .then(() => {
        dispatch(fetchProjects());
        setOpenUpdateModal(false);
        setLoading(false);
      })
      .then(() => {
        updateForm.resetFields();
        setPdfUrl(null);
        setFilePdf(null);
      });
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const handleRemove = () => {
    setPdfUrl(null);
  };

  const showPdfDrawer = () => {
    setOpenPdfDrawer(true);
  };
  const onClosePdf = () => {
    setOpenPdfDrawer(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between relative py-2">
        {loginData?.type !== "user" && (
          <Button className="flex items-center gap-2" onClick={showModal}>
            <AiOutlinePlus /> Add Project
          </Button>
        )}
        <h1
          className={`${
            loginData?.type !== "user"
              ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:inline-block hidden"
              : "mx-auto"
          } text-xl`}
        >
          Projects
        </h1>{" "}
        <Button
          className="flex items-center gap-2 bg-[#57cf9d] text-white"
          onClick={showPdfDrawer}
        >
          Print Projects
        </Button>
      </div>
      <Drawer
        title="Print project list"
        placement="right"
        onClose={onClosePdf}
        open={openPdfDrawer}
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
                    List of projects
                  </Text>
                  {data?.map((school, idx) => {
                    return (
                      <View
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
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
                          {school?.projectName}({school?.projectOwner})
                        </Text>
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
        placeholder="Search projects"
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
        loading={tableLoading}
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
          <h1 className="text-xl mb-2 text-center font-bold">Add project</h1>

          <Form.Item
            label="Project name"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please input your project name!",
              },
            ]}
          >
            <Input placeholder="Enter your projectname" />
          </Form.Item>

          <Form.Item
            label="Project owner"
            name="projectOwner"
            rules={[
              {
                required: true,
                message: "Please input your project owner!",
              },
            ]}
          >
            <Input placeholder="Enter your project owner" />
          </Form.Item>
          <div className="flex items-center gap-4 pb-2">
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Project File</Button>
            </Upload>

            {pdfUrl && (
              <div className="flex items-center gap-2 bg-slate-300 rounded px-2 py-1">
                <AiOutlineEye
                  onClick={showDrawer}
                  className="text-2xl cursor-pointer hover:text-sky-500 text-sky-700"
                />
                <BsTrash
                  onClick={handleRemove}
                  className="text-lg cursor-pointer hover:text-red-400 text-red-600"
                />
              </div>
            )}
          </div>

          <Drawer
            title="PDF Preview"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            width={450}
          >
            <Space direction="vertical">
              {pdfUrl && (
                <div>
                  <embed
                    src={pdfUrl}
                    type="application/pdf"
                    width="400"
                    height="480"
                  />
                </div>
              )}
            </Space>
          </Drawer>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              loading={loading}
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
          <h1 className="text-xl mb-2 text-center font-bold">Update project</h1>

          <Form.Item
            label="Project name"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please input your project name!",
              },
            ]}
          >
            <Input placeholder="Enter your projectname" />
          </Form.Item>

          <Form.Item
            label="Project owner"
            name="projectOwner"
            rules={[
              {
                required: true,
                message: "Please input your project owner!",
              },
            ]}
          >
            <Input placeholder="Enter your project owner" />
          </Form.Item>
          <div className="flex items-center gap-4 pb-2">
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Project File</Button>
            </Upload>

            {pdfUrl && (
              <div className="flex items-center gap-2 bg-slate-300 rounded px-2 py-1">
                <AiOutlineEye
                  onClick={showDrawer}
                  className="text-2xl cursor-pointer hover:text-sky-500 text-sky-700"
                />
                <BsTrash
                  onClick={handleRemove}
                  className="text-lg cursor-pointer hover:text-red-400 text-red-600"
                />
              </div>
            )}
          </div>

          <Drawer
            title="PDF Preview"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            width={450}
          >
            <Space direction="vertical">
              {pdfUrl && (
                <div>
                  <embed
                    src={pdfUrl}
                    type="application/pdf"
                    width="400"
                    height="480"
                  />
                </div>
              )}
            </Space>
          </Drawer>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              loading={loading}
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

export default Projects;
