import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";

const DashboardApp = () => {
  return (
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  );
};

export default DashboardApp;
