import { combineReducers } from "redux";
import {
  schoolReducer,
  schoolLoginReducer,
  fetchSchoolReducer,
} from "./school.reducer";
import {
  userLogoutReducer,
  userLoginReducer,
  userUpdateReducer,
  fetchUserReducer,
} from "./user.reducer";
import { projectReducer } from "./project.reducers";

const reducer = combineReducers({
  schoolReducer,
  schoolLoginReducer,
  fetchSchoolReducer,
  userLoginReducer,
  userLogoutReducer,
  userUpdateReducer,
  fetchUserReducer,
  projectReducer,
});

export default reducer;
