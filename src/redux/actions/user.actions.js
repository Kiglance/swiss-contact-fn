import {
  USER_LOGIN_FAIL,
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_PENDING,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PENDING,
  USER_UPDATE_SUCCESS,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  USER_FETCH_PENDING,
} from "../types/user.types";
import axios from "../../config/axios.config";
import { message } from "antd";

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_PENDING });
    const res = await axios.post("/user/login", data);

    if (res.status === 200) {
      localStorage.setItem("loginData", JSON.stringify(res.data.data));
      message.success(res.data.message);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PENDING });
    const res = await axios.patch(`/user/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUserPassword = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PENDING });
    const res = await axios.patch(`/user/password/${id}`, data);

    if (res.status === 200) {
      message.success(res.data.message);
      dispatch({
        type: USER_UPDATE_SUCCESS,
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

export const fetchUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCH_PENDING });
    const res = await axios.get(`/user/${id}`);

    if (res.status === 200) {
      dispatch({
        type: USER_FETCH_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({
      type: USER_FETCH_FAIL,
      payload: error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_PENDING });
    localStorage.removeItem("loginData");

    const data = JSON.parse(localStorage.getItem("loginData"));
    if (!data) {
      dispatch({
        type: USER_LOGOUT_SUCCESS,
        payload: "Logged out successfully",
      });
    }
  } catch (error) {
    message.error("Failed to logout");
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: "Failed to logout",
    });
  }
};
