import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

export const reqAxios = axios.create({
    baseURL: 'https://hm-sahne---ses---react-default-rtdb.firebaseio.com/'
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
