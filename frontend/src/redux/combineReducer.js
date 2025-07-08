import apodReducer from "./apod/reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from 'redux-thunk'
import marsReducer from "./marsRover/reducer";

const middleware = [thunk]
const reducer = combineReducers({
  apod: apodReducer,
  mars: marsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store