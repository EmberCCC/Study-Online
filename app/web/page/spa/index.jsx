import React from "react";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "../../route/routerBefore";

export default function Admin(props) {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
