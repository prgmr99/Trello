import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globalStyle.css";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
