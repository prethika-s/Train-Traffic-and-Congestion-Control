import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import TrainManagement from "./pages/TrainManagement";
import LiveTraffic from "./pages/LiveTraffic";
import Congestion from "./pages/Congestion";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="train-management" element={<TrainManagement />} />
        <Route path="live-traffic" element={<LiveTraffic />} />
        <Route path="congestion" element={<Congestion />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
