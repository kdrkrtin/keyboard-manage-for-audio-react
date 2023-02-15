import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const mode = localStorage.getItem("mode");
if (mode === "dark") {
  document.body.classList.add("dark");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
