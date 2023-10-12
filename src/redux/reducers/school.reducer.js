import {
  ADD_SCHOOL_FAIL,
  ADD_SCHOOL_PENDING,
  ADD_SCHOOL_SUCCESS,
  DELETE_SCHOOL_PENDING,
  DELETE_SCHOOL_FAIL,
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

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOL_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case FETCH_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_SCHOOL_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case ADD_SCHOOL_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ADD_SCHOOL_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case DELETE_SCHOOL_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_SCHOOL_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case UPDATE_SCHOOL_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case UPDATE_SCHOOL_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const schoolLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SCHOOL_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SCHOOL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchSchoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONE_SCHOOL_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ONE_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ONE_SCHOOL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
