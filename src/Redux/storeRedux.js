import { combineReducers, createStore } from "redux";

import userTablePageReducer from "./userTableReducer";
import reportPageReducer from "./reportTableReducer";
import servicePageReducer from "./serviceTableReducer";

let reducers = combineReducers({
  usersPage: userTablePageReducer,
  reportPage: reportPageReducer,
  servicePage: servicePageReducer
});

let storeRedux = createStore(reducers);

export default storeRedux;
