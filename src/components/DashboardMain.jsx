import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools } from "../redux/actions/schools.actions";
import {
  fetchAdminProjects,
  fetchProjects,
} from "../redux/actions/project.actions";
import { useLoginData } from "../context/LoginContext";

const DashboardContent = () => {
  const dispatch = useDispatch();
  const schools = useSelector((state) => state.schoolReducer)?.data?.data;
  const projects = useSelector((state) => state.projectReducer)?.data?.data;
  const { loginData } = useLoginData();
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    dispatch(fetchSchools());
    if (loginData?.type === "user") {
      dispatch(fetchAdminProjects());
    } else {
      dispatch(fetchProjects());
    }
    setCurrentDate(new Date().toDateString());
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-8">
        {" "}
        <div></div>
        <div>
          <span className="font-bold">Current Date: </span>
          {currentDate}
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-start md:justify-evenly mx-auto max-w-[900px]">
        <div
          className={`flex flex-col items-center bg-[#57cf9d] min-w-[162.83px] w-fit px-10 py-4 rounded-md ${
            loginData?.type !== "user" && "hidden"
          }`}
        >
          <span className="text-5xl text-zinc-700 font-bold">
            {schools?.length}
          </span>
          {schools?.length > 1 ? "Schools" : "School"}
        </div>
        <div className="flex flex-col items-center bg-[#57cf9d] min-w-[162.83px] w-fit px-10 py-4 rounded-md">
          <span className="text-5xl text-zinc-700 font-bold">
            {projects?.length}
          </span>
          {projects?.length > 1 ? "Projects" : "Project"}
        </div>
        <div
          className={`flex flex-col items-center bg-[#57cf9d] min-w-[162.83px] w-fit px-10 py-4 rounded-md ${
            loginData?.type !== "user" && "hidden"
          }`}
        >
          <span className="text-5xl text-zinc-700 font-bold">2</span>Users
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
