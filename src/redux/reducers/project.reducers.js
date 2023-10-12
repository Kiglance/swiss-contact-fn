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
import { UPDATE_SCHOOL_FAIL } from "../types/school.types";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_PROJECT_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case ADD_PROJECT_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ADD_PROJECT_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROJECT_PENDING:
      return {
        ...state,
        data: [],
        loading: true,
      };
    case UPDATE_PROJECT_SUCCESS:
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
