import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authenticateReducer from "./reducer/AuthReducer";
import entrepriseReducer from "./reducer/EntreprisesReducer";
import rendezVousReducer from "./reducer/RendezVousReducer";

const rootReducer = combineReducers({
  authenticateReducer,
  entrepriseReducer,
  rendezVousReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
