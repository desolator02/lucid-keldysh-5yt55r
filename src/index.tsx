import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

// var cors = require('cors')
// var express = require('express')
// var app = express()

// app.use(cors({
//   origin: [
//       'https://www.nseindia.com' //nse url
//   ],    
//   optionsSuccessStatus: 200
//   }))


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);