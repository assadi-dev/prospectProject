import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authenticateReducer from "./reducer/AuthReducer";
import entrepriseReducer from "./reducer/EntreprisesReducer";

const combineRootReducer = combineReducers({
  authenticateReducer,
  entrepriseReducer,
});

const store = createStore(combineRootReducer, applyMiddleware(thunk));

export default store;
