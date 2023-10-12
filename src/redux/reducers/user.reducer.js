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

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case USER_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: "error null",
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
