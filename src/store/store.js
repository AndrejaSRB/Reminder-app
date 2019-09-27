import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";
import remindersReducer from "./reducers/remindersReducer";
import rootReducer from "./reducers/rootReducer";
import listReducer from "./reducers/listReducer";
import rootEpic from "./epics/rootEpic";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
  root: rootReducer,
  reminder: remindersReducer,
  lists: listReducer
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
