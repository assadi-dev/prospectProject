import React, { useEffect, useState, useContext } from "react";

import { Provider as ReduxProvider } from "react-redux";
import App from "./App";

import store from "./src/redux/store";

export default function AppProvider() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}
