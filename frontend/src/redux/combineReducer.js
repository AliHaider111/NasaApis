import apodReducer from "./apod/reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from 'redux-thunk'

const middleware = [thunk]
const reducer = combineReducers({
  apod: apodReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store