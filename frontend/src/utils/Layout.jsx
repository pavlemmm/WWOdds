import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;
