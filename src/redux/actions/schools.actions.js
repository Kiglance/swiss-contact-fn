import {
  ADD_SCHOOL_FAIL,
  ADD_SCHOOL_PENDING,
  ADD_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAIL,
  DELETE_SCHOOL_PENDING,
  DELETE_SCHOOL_SUCCESS,
  FETCH_SCHOOL_FAIL,
  FETCH_SCHOOL_PENDING,
  FETCH_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAIL,
  UPDATE_SCHOOL_PENDING,
  UPDATE_SCHOOL_SUCCESS,
  LOGIN_SCHOOL_FAIL,
  LOGIN_SCHOOL_PENDING,
  LOGIN_SCHOOL_SUCCESS,
  FETCH_ONE_SCHOOL_FAIL,
  FETCH_ONE_SCHOOL_PENDING,
  FETCH_ONE_SCHOOL_SUCCESS,
} from "../types/school.types";
import axios from "../../config/axios.config";
import { message } from "antd";

export const fetchSchools = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SCHOOL_PENDING });
    const res = await axios.get(`/school`);
    dispatch({
      type: FETCH_SCHOOL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const fetchOneSchool = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ONE_SCHOOL_PENDING });
    const res = await axios.get(`/school/${id}`);
    dispatch({
      type: FETCH_ONE_SCHOOL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ONE_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const addSchool = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SCHOOL_PENDING });

    const res = await axios.post("/school", data);

    if (res.status === 201) {
      message.success(res.data.message);
      await dispatch({
        type: ADD_SCHOOL_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: ADD_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteSChool = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SCHOOL_PENDING });

    const res = await axios.delete(`/school/${id}`);

    if (res.status === 200) {
      message.success(res.data.message);
      await dispatch({
        type: DELETE_SCHOOL_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: DELETE_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const changeSchoolStatus = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SCHOOL_PENDING });

    const res = await axios.patch(`/school/${id}`, data);

    if (res.status === 201) {
      message.success(res.data.message);
      await dispatch({
        type: UPDATE_SCHOOL_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: UPDATE_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateSchool = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SCHOOL_PENDING });

    const res = await axios.patch(`/school/profile/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      await dispatch({
        type: UPDATE_SCHOOL_SUCCESS,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: UPDATE_SCHOOL_FAIL,
      payload: error.response.data,
    });
  }
};

export const loginSchool = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_SCHOOL_PENDING });
    const res = await axios.post("/school/login", data);

    if (res.status === 200) {
      localStorage.setItem("loginData", JSON.stringify(res.data.data));
      message.success(res.data.message);
      dispatch({
        type: LOGIN_SCHOOL_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: LOGIN_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSchoolPassword = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SCHOOL_PENDING });
    const res = await axios.patch(`/school/password/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      dispatch({
        type: UPDATE_SCHOOL_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response,
    });
  }
};
