import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

//var cors = require('cors')
//var app = express()
//app.use(cors())


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);