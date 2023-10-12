import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SchoolDashboard from "../pages/SchoolDashboard";
import Docum from "../utils/trials";
import School from "../components/School";
import Project from "../components/Project";

const AllRoutes = (props) => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/dashboard/school/:id" element={<School />} />
      <Route exact path="/dashboard/project/:id" element={<Project />} />
      <Route exact path="/trial" element={<Docum />} />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
