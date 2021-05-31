import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = configureStore({
  reducer,
  storeEnhancers
});

export default store;