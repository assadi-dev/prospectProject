import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authenticateReducer from "./reducer/AuthReducer";
import entrepriseReducer from "./reducer/EntreprisesReducer";

const rootReducer = combineReducers({
  authenticateReducer,
  entrepriseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
