// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TaskApp } from "./ui/react/TaskApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <TaskApp />
  </React.StrictMode>,
);
