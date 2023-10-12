import {
  ADD_PROJECT_FAIL,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  FETCH_ONE_PROJECT_FAIL,
  FETCH_ONE_PROJECT_PENDING,
  FETCH_ONE_PROJECT_SUCCESS,
  FETCH_PROJECT_FAIL,
  FETCH_PROJECT_PENDING,
  FETCH_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
} from "../types/project.types";
import axios from "../../config/axios.config";
import { message } from "antd";

export const fetchProjects = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROJECT_PENDING });
    const res = await axios.get(`/project`);
    dispatch({
      type: FETCH_PROJECT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const fetchSchoolProjects = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROJECT_PENDING });
    const res = await axios.get(`/project/school/${id}`);
    dispatch({
      type: FETCH_PROJECT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const fetchAdminProjects = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROJECT_PENDING });
    const res = await axios.get(`/project/admin`);

    dispatch({
      type: FETCH_PROJECT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const addProject = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PROJECT_PENDING });

    const res = await axios.post("/project", data);

    if (res.status === 201) {
      message.success(res.data.message);
      await dispatch({
        type: ADD_PROJECT_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: ADD_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteProjectAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_PENDING });

    const res = await axios.delete(`/project/${id}`);

    if (res.status === 200) {
      message.success(res.data.message);
      await dispatch({
        type: DELETE_PROJECT_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_PENDING });

    const res = await axios.patch(`/project/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      await dispatch({
        type: UPDATE_PROJECT_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateProjectStatus = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_PENDING });

    const res = await axios.patch(`/project/status/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      await dispatch({
        type: UPDATE_PROJECT_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data,
    });
  }
};
