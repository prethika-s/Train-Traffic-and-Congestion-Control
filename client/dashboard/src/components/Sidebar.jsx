import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <NavLink to="/" end>Train Delay & Analytics</NavLink>
        <NavLink to="/train-management">Train Management</NavLink>
        <NavLink to="/live-traffic">Live Traffic</NavLink>
        <NavLink to="/congestion">Congestion</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
