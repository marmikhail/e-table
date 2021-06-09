import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { DeviceThemeProvider } from '@sberdevices/plasma-ui/components/Device';

ReactDOM.render(
  <DeviceThemeProvider>
      <App />
  </DeviceThemeProvider>,
  document.getElementById('root'),
);

reportWebVitals();
